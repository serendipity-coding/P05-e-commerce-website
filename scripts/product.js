let params = new URLSearchParams(document.location.search.substring(1));
let productId = params.get("productid"); 

const getOneProduct = async (id) => {   
    const response = await fetch(`http://localhost:3000/api/cameras/${id}`);
    const data = await response.json();
    return data;
};

const updateProductUi = (data) => {
    document.getElementById('details').innerHTML +=`
    <div class="card rounded">
        <img src="${data.imageUrl}" alt="image camera" class="cameraImg img-fluid card-img-top">
        <div class="text-muted text-center">
            <h4 class="my-3">${data.name}</h4>
            <div class="my-3">${data.description}</div>
            <div class="form-group">
                <label for="lences">Select lence</label>
                <select class="lense form-control">
    
                </select>
            </div>               
            <div class="my-2">
                <strong>Prix :</strong> ${data.price/100}<span>	&euro;</span>
            </div>
            <div>
                <strong>Quantité :</strong> <input id="quantity" type ="number" value="1" min = "1" max = "10"> </input>
            </div>
        </div>  
    </div>
   `;
      
   
}
const listLenses = (data) => {
    for (let i=0 ; i < data.lenses.length ; i++){
        document.querySelector('.lense').innerHTML+=`<option>${data.lenses[i]}</option>`;
    }
};

const addProductToCart = (data) =>{
    
    let cart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (cart === null){
        cart= [];    
    }
    for (let i in cart){
        if (cart[i].name === data.name){   
            cart[i].quantity =+ document.getElementById('quantity').value ;
            localStorage.setItem(`shoppingCart`, JSON.stringify(cart));
            return;
        }          
    }    
    cart.push({
        id: data._id,
        name: data.name,
        price: data.price/100,
        lenses: document.querySelector(".lense").value, 
        quantity: document.getElementById('quantity').value,
    });  
    localStorage.setItem(`shoppingCart`, JSON.stringify(cart));
};

const totalNumberOfItemsInCart= () =>{
    let cart = JSON.parse(localStorage.getItem('shoppingCart'));
    let totalItemsNumber = 0;
    if (cart === null){
        cart= [];    
    }
    for (let i=0 ; i < cart.length ; i++){
        totalItemsNumber = totalItemsNumber + (cart[i].quantity); 
        }
        console.log('artciles in cart=',totalItemsNumber);
    document.querySelector('.numberArticleCart').innerHTML= totalItemsNumber;
}

window.addEventListener("DOMContentLoaded", () => {
    totalNumberOfItemsInCart();
  });

getOneProduct(productId)
        .then( data => {
            updateProductUi(data);
            listLenses(data);            
            document.getElementById('addToCartBtn').addEventListener('click', ()=> {
                addProductToCart(data); 
            });            
        }).catch( err => console.log(err));
        