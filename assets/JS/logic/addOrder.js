import orderAPI from "../api/orderAPI";

async function createOrder() {
    const btnOrder = document.querySelector('#btnOrder');
    btnOrder.addEventListener('submit',(e)=>{
        e.preventDefault();
        const id_customer = localStorage.getItem("login_id");
        const address = document.querySelector('#Address').value;
        const paymentMethods = document.querySelector('#radio-group');
        let selectPaymentMethod = "";
        for(const paymentMethod of paymentMethods) {
            if(paymentMethod.checked) {
                selectPaymentMethod = paymentMethod.value;
                break;
            }
        }
        const productID = document.querySelector('.ProductID').value;
        console.log(productID);
        const quantity = document.querySelector('.product-quantity').value;

        const data = {
            id_customer: id_customer,
            order_date: "2023-10-24T16:47:06.563Z",
            shippingAddress: address,
            total_amount: 0,
            paymentMethod: selectPaymentMethod,
            orderStatus: 0,
            orderItems: [
              {
                idsp: productID,
                quantity: quantity,
                subtotal: 0
              },
            ]
          }

    })
}
createOrder();

// const productID = document.querySelector('.ProductID')
// console.log(productID);