export default class Product {
    constructor() {
      
    }

    updateProductUi = (data) => {
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
                <div >
                    <strong>Quantité :</strong> <input id="quantity" type ="number" value="1" min = "1" max = "10"> </input>
                    <span class= "quantityInputFeedback" id="quantityInputFeedback" oninput="myFunction()">quantity must be between 1 and 10 </span> 
                </div>
            </div>  
        </div>
       `;
           
    }
    listLenses = (data) => {
        for (let i=0 ; i < data.lenses.length ; i++){
            document.querySelector('.lense').innerHTML+=`<option>${data.lenses[i]}</option>`;
        }
    };
    
    addProductToCart = (data) =>{  
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

    
    
}