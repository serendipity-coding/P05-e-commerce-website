let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));

displayCartItems = (products) => {                            //add products to the cart from localStorage
    if (products){  
        document.getElementById('emptyCart').innerHTML = ''; 
        for (let i=0 ; i < products.length ; i++){    
            document.querySelector('.table').innerHTML += `    
            <tbody>
                <tr>
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>  
                    <td>
                        <div class= "cartQuantityInput">
                            <button class=" quantityBtn substract${i}">-</button>
                            <input id ="input-${i}" class  type="number" value=${products[i].quantity}>
                            <button class="quantityBtn  add${i}">+</button>
                            <i class="fas fa-trash-alt fa-2x trash${i}"></i>
                        </div>
                    </td> 
                                       
                </tr>                 
            </tbody>
        ` ;                
        }    
        document.querySelector('.orderForm').classList.remove('d-none');   
        // console.log(product);    
    }
    else{
        console.log('no products in the shopping cart');
        document.querySelector('.fullCart').innerHTML='';
    }
}
displayCartItems(shoppingCart);


totalCartPrice = (cart) =>{
    let totalPrice = 0;
    for (let i=0 ; i < cart.length ; i++){
      totalPrice= totalPrice + (((cart[i].price))*(document.getElementById(`input-${i}`).value)); 
    }
    console.log('total price',totalPrice);
    document.querySelector('.totalPrice').innerHTML = `<h3>Total price = ${totalPrice} $</h3>`
    sessionStorage.setItem(`totalPrice`, JSON.stringify(totalPrice));
  }
  totalCartPrice(shoppingCart);
//------------------------Form validation------------------//
let form = document.querySelector('.form');
let inputs = document.querySelectorAll('input'); 
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let city = document.getElementById("city");
let streetNumber = document.getElementById("streetNumber");
let streetName = document.getElementById("streetName");
//display error message
inputs.forEach((input)=> { 
    input.addEventListener('focus', (e) => { 
        e.target.nextElementSibling.classList.add('showErrorMessage');                   
    });
    input.addEventListener('keyup', (e) => { 
        e.target.nextElementSibling.classList.remove('showErrorMessage');                   
    })
});

function validateInputForm(){                                     //form must be correctly filled to pass to the 
    if( firstName.value.length > 0 &&                              //confirmation page
        lastName.value.length >0 &&
        email.value.length > 0 &&
        streetName.value.length > 0 &&
        streetNumber.value.length > 0  &&
        city.value.length > 0
    ){
        document.querySelector('.link').setAttribute('href', 'confirmation.html');
        console.log('form function passed');
    }else{
        console.log('didnt pass');
    }
};

//----validate order and send request----////
function postOrderRequest(order) {   
    let achat = JSON.stringify(order);
      console.log('achat',achat);
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          let confirmation = JSON.parse(this.responseText);
          console.log('confrmation',confirmation);
          sessionStorage.setItem('order', JSON.stringify(confirmation));
          localStorage.clear();
        };
      };
      request.open("post", "http://localhost:3000/api/cameras/order");
      request.setRequestHeader("Content-Type", "application/json");
      request.send(achat);
    
    }
    
function validatePurchase() {
    const products = []                                    // final request with the order
    for (let i = 0; i < shoppingCart.length; i++) {             //contains the info of all th products selected
        products.push(shoppingCart[i].id)
    }
    console.log('products',products);
    
    let  contact = {
        lastName: lastName.value,
        firstName: firstName.value,      
        address: streetNumber.value + ' ' + streetName.value,
        city: city.value,
        email: email.value
    };  
    console.log('contact',contact);

    let objt = {                                            //this object will be send to server to receive order id
        contact,
        products
    };
    console.log('objt',objt);
    postOrderRequest(objt);
    }; 
 
document.querySelector('.purchaseButton').onclick = (()=>{   //form must be validated to confirm the purchase 
    console.log('button clicked');
    validateInputForm();
    validatePurchase(); 
});

document.getElementById('deleteStorage').onclick= (() => {
    localStorage.clear();
    document.location.reload(true);
})

//----------------------------//
// const totalNumberOfItemsInCart= () =>{
//     let cart = JSON.parse(localStorage.getItem('shoppingCart'));
//     let totalItemsNumber = 0;
//     if (cart === null){
//         cart= [];    
//     }
//     for (let i=0 ; i < cart.length ; i++){
//         totalItemsNumber = totalItemsNumber + (cart[i].quantity); 
//         }
//         console.log('artciles in cart=',totalItemsNumber);
//     document.querySelector('.numberArticleCart').innerHTML = totalItemsNumber;
// }

// // window.addEventListener("DOMContentLoaded", () => {
// //     totalNumberOfItemsInCart();
// //   });

//----------------- add and remove one item--------------//
updateQuantity= (cart) =>{
    for (let i=0 ; i < cart.length ; i++){  
      increment= () =>{
        document.querySelector(`.add${i}`).addEventListener('click', () =>{    
            document.getElementById(`input-${i}`).value = parseInt(document.getElementById(`input-${i}`).value) + 1; 
            totalCartPrice(shoppingCart);
        });   
      }
      decrement= () =>{
        document.querySelector(`.substract${i}`).addEventListener('click', () =>{
            document.getElementById(`input-${i}`).value= parseInt(document.getElementById(`input-${i}`).value) - 1;
            totalCartPrice(shoppingCart);
            
        });
      }
      increment();
      decrement();     
    }
  }
  updateQuantity(shoppingCart);


  deleteOneItem= (cart) =>{
    for (let i=0 ; i < cart.length ; i++){  
        document.querySelector(`.trash${i}`).addEventListener('click', () =>{   
            console.log('clicked on trash');
            cart.splice(i, 1);
            localStorage.setItem(`shoppingCart`, JSON.stringify(cart));
            document.location.reload(true);
        });  
      
  }
}
  deleteOneItem(shoppingCart);