import cartAPI from "../api/cartAPI";
import { toast } from "../utils/toast";

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const id_customer = localStorage.getItem("login_id");

async function getCartItems() {
    const {arrayCart} = await cartAPI.getCartItem(id_customer);
    TotalAmount(arrayCart);
    renderCartItem('table_cartItems', arrayCart);
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
    btnDeleteCartItem?.addEventListener('click', async (e) =>{
        e.preventDefault();
        try {
            await cartAPI.deleteCartItem(cartItem.id_customer, cartItem.idsp);
            await Element.remove();
            await countProductCart();
            await getCartItems();

        } catch (error) {
            console.log("Error deleting cart item", error);
        }
    })
    return Element;
}

// Calculate the total cost of products in the shopping cart
function TotalAmount(cartItems) {
    if (!Array.isArray(cartItems)) return;
    const totalAmount = cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.giaban * cartItem.quantity;
    }, 0);
    const elementTotalAmount = document.querySelector("#totalAmount");
    if(elementTotalAmount) elementTotalAmount.textContent = cartItems.length === 0 ? VND.format(0) : VND.format(totalAmount);
}

// Render cart items
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

// Count the number of products in the shopping cart and display products
async function countProductCart() {
const quantityCartItem = document.querySelector("#quantityCartItem");
const cartList = document.querySelector(".quickview-cart ul");
const {arrayCart} = await cartAPI.getCartItem(id_customer);
const totalQuantityCartItem = arrayCart?.length;

if (totalQuantityCartItem > 0) {
    quantityCartItem.textContent = totalQuantityCartItem;
    cartList.innerHTML = "";
    arrayCart.forEach(item => {
        const listItem = document.createElement("li");

        const productImage = document.createElement("img");
        productImage.src = item.anhsp;
        productImage.classList.add('product-image-class');

        const productName = document.createElement("span");
        productName.textContent = item.tensp;

        listItem.appendChild(productImage);
        listItem.appendChild(productName);

        cartList.appendChild(listItem);
    });
} else {
    quantityCartItem.textContent = 0;
    cartList.innerHTML = "<li>Bạn chưa có sản phẩm nào trong giỏ hàng!</li>";
    }
}

countProductCart()

// Next page
const btnPayment = document.querySelector("#btnPayment");
btnPayment?.addEventListener("click", (e) =>{
    e.preventDefault();
    window.location.assign("./shippingAndPayment.html");
})

// update quantity cart item
const btnUpdate = document.querySelector("#btnUpdateCartItem");
btnUpdate?.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const {arrayCart} = await cartAPI.getCartItem(id_customer);
        const inputs = document.querySelectorAll(".quantity-input");
        const data = [];
        for(let i = 0; i < arrayCart.length; i++) {
            const newQuantity = inputs[i].value;
            const item = arrayCart[i];
            data.push({
                idsp: item.idsp,
                newQuantity: newQuantity
            })
            await Promise.all(data.map(item => cartAPI.updateCartItemQuantity(id_customer, item.idsp, item.newQuantity)));
            getCartItems();
            toast.success("Cập nhật số lượng thành công");
        }
    } catch (error) {
        console.log("Error updating", error);
    }
});
