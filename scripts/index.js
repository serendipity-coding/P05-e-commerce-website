const getProducts = async () => {
    const response = await fetch('http://localhost:3000/api/cameras');
    const data = await response.json();
    return data;
};

const updateHomePageUI= (data) => {      
    document.getElementById('listCamera').innerHTML += `
        <div class="card rounded">
            <img src="${data.imageUrl}" alt="image camera" class="cameraImg img-fluid card-img-top">
            <div class="text-muted text-center">
                <h4 class="my-3">${data.name}</h4>
                <div class="my-2"><strong>Prix :</strong> ${data.price/100} <span>	&euro;</span></div>
                <a href="product.html?productid=${data._id}" >
                    <button  type="button" class="btn btn-dark my-2 camera-btn">Details</button>
                </a>
            </div>  
        </div>
    `;   
};

getProducts().then( data => {
    
                for( let i=0 ; i < data.length; i++){
                    updateHomePageUI(data[i]);
                    
                }
            })
            .catch (err => console.log(err));