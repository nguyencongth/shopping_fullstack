
import cartAPI from "../api/cartAPI";
import orderAPI from "../api/orderAPI";
import { toast } from "../utils/toast";

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const id_customer = localStorage.getItem("login_id");
const {arrayCart} = await cartAPI.getCartItem(id_customer);
console.log(arrayCart);

async function getProductInCart() {
    renderCartItem('list-product', arrayCart);
    TotalAmount(arrayCart);
}
getProductInCart();

// Start Create order
function createOrder() {
    const btnOrder = document.querySelector('#btnOrder');
    btnOrder.addEventListener('click', async (e)=>{
        e.preventDefault();
        const id_customer = localStorage.getItem("login_id");
        const address = document.querySelector('#Address').value;
        const paymentMethods = document.getElementsByName("payment-method")
        let selectPaymentMethod = "";
        for(const paymentMethod of paymentMethods) {
            if(paymentMethod.checked) {
                selectPaymentMethod = paymentMethod.value;
                break;
            }
        }
        const orderItems = [];
        for(const item of arrayCart) {
            const orderItem = {
                idsp: item.idsp,
                quantity: item.quantity,
                subtotal: 0
            };
            orderItems.push(orderItem);
        }

        const data = {
            id_customer: id_customer,
            order_date: "2023-10-24T16:47:06.563Z",
            shippingAddress: address,
            total_amount: 0,
            paymentMethod: selectPaymentMethod,
            orderStatus: 0,
            orderItems: orderItems,
        }
        try {
            await orderAPI.addOrder(data);
            await clearCart();
            toast.success("Đặt hàng thành công");
            setTimeout(() => {
                window.location.assign("/assets/HTML/order.html");
            }, 1000)
        } catch (error) {
            console.log("Error when ordering", error);
        }
    });
}
createOrder();
// End Create order

// Start clear cart
async function clearCart() {
    try {
        await cartAPI.deleteCart(id_customer);
    } catch (error) {
        console.log("Error when clearing cart", error);
    }
}
// Start clear cart

function createCartItemElement(ordertItem) {
    if (!ordertItem) return;
    const postTemplate = document.getElementById('postTemplate');
    if (!postTemplate) return;
  
    const Element = postTemplate.content.firstElementChild.cloneNode(true);
  
    if (!Element) return;
  
    const img = Element.querySelector('.product-thumbnail-image');
    const quantity_thumb = Element.querySelector('.product-thumbnail-quantity');
    const nameProduct = Element.querySelector('.product-description-name');
    const priceProduct = Element.querySelector('.price');
    const quantity = Element.querySelector('.product-quantity');
    
    if (img) img.src = ordertItem.anhsp;
    if (quantity_thumb) quantity_thumb.textContent = ordertItem.quantity;
    if (nameProduct) nameProduct.textContent = ordertItem.tensp;
    if (priceProduct) priceProduct.textContent = VND.format(ordertItem.giaban * ordertItem.quantity);
    if (quantity) quantity.textContent = ordertItem.quantity;

    return Element;

}

function TotalAmount(orderItems) {
    if (!Array.isArray(orderItems)) return;
    let totalQuantity = 0;
    let totalAmount = 0;
    orderItems.forEach((orderItem) => {
        totalQuantity += orderItem.quantity;
        totalAmount += orderItem.giaban * orderItem.quantity;
    });

    const elementTotalAmount = document.querySelector("#totalPrice");
    elementTotalAmount.textContent = VND.format(totalAmount);

    const moneyTemp = document.querySelector("#moneyTemp");
    moneyTemp.textContent = VND.format(totalAmount);

}

function renderCartItem(elementId, orderItems) {
    if (!Array.isArray(orderItems)) return;
    const Element = document.getElementById(elementId);
    if (!Element) return;
  
    Element.textContent = '';
  
    orderItems.forEach((orderItem) => {
      const liElement = createCartItemElement(orderItem);
      Element.appendChild(liElement);
    });
}