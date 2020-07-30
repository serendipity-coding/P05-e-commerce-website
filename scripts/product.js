import Product from '../views/Product.js'

const getOneProduct = async () => {    
    let params = new URLSearchParams(document.location.search.substring(1));
    let productId = params.get("productid");                                              
    const response = await fetch(`http://localhost:3000/api/cameras/${productId}`);
    const data = await response.json();
    return data;
};
       
getOneProduct()
        .then( data => {
            const newProduct = new Product();
            newProduct.updateProductUi(data);
            newProduct.listLenses(data);                 
            let quantityInput = document.getElementById('quantity');
            quantityInput.addEventListener('input', function()
            {
                if(quantityInput.value <= 0 || quantityInput.value > 10 ){
                    document.getElementById('quantityInputFeedback').style.visibility= "visible";  
                    document.getElementById('addToCartBtn').disabled = true;          
                }else{
                    document.getElementById('quantityInputFeedback').style.visibility= "hidden"; 
                    document.getElementById('addToCartBtn').disabled = false;                          
                };
            });            
            document.getElementById('addToCartBtn').addEventListener('click', ()=> {
                newProduct.addProductToCart(data);            
            });   
                 
        }).catch( err => console.log(err));


