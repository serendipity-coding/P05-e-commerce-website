let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
let form = document.querySelector('.form');
let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let emailInput = document.getElementById("email");
let cityInput = document.getElementById("city");
let addressInput = document.getElementById("address");

displayCartItems = () => {                            //add products to the cart from localStorage
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (shoppingCart){  
        document.getElementById('emptyCart').innerHTML = ''; 
        for (let i=0 ; i < shoppingCart.length ; i++){    
            document.querySelector('.table').innerHTML += `    
            <tbody>
                <tr>
                    <td>${shoppingCart[i].name}</td>
                    <td>${shoppingCart[i].price}</td>  
                    <td>
                        <div class= "cartQuantityInput">
                            <button class=" quantityBtn substract${i}">-</button>
                            <input id ="input-${i}" class  type="number" value=${shoppingCart[i].quantity}>
                            <button class="quantityBtn  add${i}">+</button>
                            <i class="fas fa-trash-alt fa-2x trash${i}"></i>
                        </div>
                    </td> 
                                       
                </tr>                 
            </tbody>
        ` ;                
        }    
        document.querySelector('.orderForm').classList.remove('d-none');   
    }
    else{
        document.querySelector('.fullCart').innerHTML='';
    }
}
displayCartItems();


totalCartPrice = () =>{
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    let totalPrice = 0;
    for (let i=0 ; i < shoppingCart.length ; i++){
      totalPrice= totalPrice + (((shoppingCart[i].price))*(document.getElementById(`input-${i}`).value)); 
    }
    document.querySelector('.totalPrice').innerHTML = `<h3>Total price = ${totalPrice} $</h3>`
    sessionStorage.setItem(`totalPrice`, JSON.stringify(totalPrice));
}
totalCartPrice();

//----------------------------------------------------Form validation-----------------------------------------------------//
let inputs = document.querySelectorAll('input');        
function validateFormInput( field , regex){             
    if(regex.test(field.value)){      
        field.nextElementSibling.classList.remove('active');       
    }else{
        field.nextElementSibling.classList.add('active');        
    }
}

inputs.forEach((input)=> { 
    input.addEventListener('keyup', (e) => {                                          //keyword event for each input
        let patterns = {
            firstName : /^[a-zA-Z]{4,12}$/,
            lastName : /^[a-zA-Z]{5,12}$/,
            email:/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$/,
            address : /^[0-9]{1,5}( [-a-zA-Zàâäéèêëïîôöùûüç]+)+$/,
            city : /[a-z-'éè A-Z]{2,30}$/           
        };
        validateFormInput(e.target, patterns[e.target.attributes.name.value] );      
        validateForm()          
    })
});
function validateForm(){                                                                 //form must be correctly filled to pass to the 
    if( document.getElementById('firstName').value.length > 0 &&                         //confirmation page
        document.getElementById('lastName').value.length >0 &&
        document.getElementById('email').value.length > 0 &&
        document.getElementById('address').value.length > 0 &&
        document.getElementById('city').value.length > 0       
    ){
        // validatePurchase(); 
        document.getElementById('purchaseBtn').disabled = false;       
    }
}




//------------------------------------validate order and send request----------------------------------------------------------////
function postOrderRequest(order) {   
    let achat = JSON.stringify(order);
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          let confirmation = JSON.parse(this.responseText);
          sessionStorage.setItem('order', JSON.stringify(confirmation));
        };
      };
      request.open("post", "http://localhost:3000/api/cameras/order");
      request.setRequestHeader("Content-Type", "application/json");
      request.send(achat);  
}
    
function validatePurchase() {
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    const products = []   
                                                                  // final request with the order
    for (let i = 0; i < shoppingCart.length; i++) {             //contains the info of all th products selected
        products.push(shoppingCart[i].id)
    }
   
    let  contact = {
        firstName: firstNameInput.value, 
        lastName: lastNameInput.value,            
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value
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
    validatePurchase(); 
});

document.getElementById('deleteStorage').onclick= (() => {
    localStorage.clear();
    document.location.reload(true);
})


//----------------- add and remove one item--------------//
updateQuantity= () =>{
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    for (let i=0 ; i < shoppingCart.length ; i++){  
    //--increment--//
        document.querySelector(`.add${i}`).addEventListener('click', () =>{    
            document.getElementById(`input-${i}`).value = parseInt(document.getElementById(`input-${i}`).value) + 1;    
            shoppingCart[i].quantity = document.getElementById(`input-${i}`).value;
            localStorage.setItem(`shoppingCart`, JSON.stringify(shoppingCart));
            totalCartPrice(shoppingCart);
        });   
     //--deccrement--//
        document.querySelector(`.substract${i}`).addEventListener('click', () =>{
            document.getElementById(`input-${i}`).value= parseInt(document.getElementById(`input-${i}`).value) - 1;
            shoppingCart[i].quantity = document.getElementById(`input-${i}`).value;
            localStorage.setItem(`shoppingCart`, JSON.stringify(shoppingCart));
            totalCartPrice(shoppingCart);           
        });
      }
    //   increment();  
}
  
updateQuantity();


deleteOneItem= () =>{
let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
for (let i=0 ; i < shoppingCart.length ; i++){  
    document.querySelector(`.trash${i}`).addEventListener('click', () =>{   
        shoppingCart.splice(i, 1);
        localStorage.setItem(`shoppingCart`, JSON.stringify(shoppingCart));
        document.location.reload(true);
    });  
    
}
}
deleteOneItem();