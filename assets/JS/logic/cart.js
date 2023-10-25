import cartAPI from "../api/cartAPI";

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
const id_customer = localStorage.getItem("login_id");
async function getCartItems() {
    const {arrayCart} = await cartAPI.getCartItem(id_customer);
    renderCartItem('table_cartItems', arrayCart);
    TotalAmount(arrayCart);
}
getCartItems();

function createCartItemElement(cartItem) {
    if (!cartItem) return;
    const postTemplate = document.getElementById('postTemplate');
    if (!postTemplate) return;
  
    const Element = postTemplate.content.firstElementChild.cloneNode(true);
  
    if (!Element) return;
  
    const img = Element.querySelector('#img');
    const nameProduct = Element.querySelector('#nameProduct');
    const priceProduct = Element.querySelector('#priceProduct');
    const quantity = Element.querySelector('#quantity');
    const totalPrice = Element.querySelector('#totalPrice');
  
    if (img) img.src = cartItem.anhsp;
    if (nameProduct) nameProduct.textContent = cartItem.tensp;
    if (priceProduct) priceProduct.textContent = VND.format(cartItem.giaban);
    if (quantity) quantity.value = cartItem.quantity;
    if (totalPrice) totalPrice.textContent = VND.format(cartItem.giaban * cartItem.quantity);

    const btnDeleteCartItem = Element.querySelector(".cart_remove");
    btnDeleteCartItem.addEventListener('click', async (e) =>{
        e.preventDefault();
        try {
            await cartAPI.deleteCartItem(cartItem.id_customer, cartItem.idsp);
            getCartItems();
        } catch (error) {
            console.log("Error deleting cart item", error);
        }
    })

  
    return Element;
}

function TotalAmount(cartItems) {
    if (!Array.isArray(cartItems)) return;
    let totalQuantity = 0;
    let totalAmount = 0;
    cartItems.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
        totalAmount += cartItem.giaban * cartItem.quantity;
    });

    const elementTotalAmount = document.querySelector("#totalAmount");
    elementTotalAmount.textContent = VND.format(totalAmount);
}

function renderCartItem(elementId, cartItems) {
    if (!Array.isArray(cartItems)) return;
    const Element = document.getElementById(elementId);
    if (!Element) return;
  
    Element.textContent = '';
  
    cartItems.forEach((cartItem) => {
      const liElement = createCartItemElement(cartItem);
      Element.appendChild(liElement);
    });
}

// đếm số lượng sp trong giỏ hàng
const quantityCartItem = document.querySelector("#quantityCartItem");
const {arrayCart} = await cartAPI.getCartItem(id_customer);
const totalQuantityCartItem = arrayCart.length;
quantityCartItem.textContent = totalQuantityCartItem;

// Chuyển trang
const btnPayment = document.querySelector("#btnPayment");
console.log(btnPayment);
btnPayment.addEventListener("click", (e) =>{
    e.preventDefault();
    window.location.assign("./shippingAndPayment.html");
})

// update quantity cart item
const btnUpdate = document.querySelector("#btnUpdateCartItem");
btnUpdate.addEventListener("click", async (e) =>{
    e.preventDefault();
    const newQuantity = document.querySelector("#quantity").value;
    const productIDs = arrayCart.map(item =>item.idsp);
    const data = productIDs.map(idsp => ({
        cartID: 0,
        id_customer: parseInt(id_customer),
        idsp: idsp,
        idloaisp: 0,
        anhsp: "string",
        tensp: "string",
        giaban: 0,
        quantity: parseInt(newQuantity),
        dateAdded: "2023-10-25T17:07:05.307Z"
    }))
    try {
        await cartAPI.updateCartItemQuantity(data);
        getCartItems();
    } catch (error) {
        console.log("Error updating", error);
    }
    
});