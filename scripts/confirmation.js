

clearStorage= ()=> {
    sessionStorage.clear();
    localStorage.clear();
}
    

getOrderId = () => {
    //display total price in the confirmation page
    let price = sessionStorage.getItem('totalPrice');
    document.getElementById('confirmationPrice').innerHTML= `${price}`;
    //display order id 
    const myOrder = JSON.parse(sessionStorage.getItem("order"));
    if(myOrder === null){
        console.log('myOrder is null')
    }else{
        document.getElementById("clientName").innerText = myOrder.contact.lastName; 
        document.getElementById("confirmationId").innerText = myOrder.orderId;
    }

}

getOrderId();





