import cartAPI from "../api/cartAPI";
import productApi from "../api/productAPI";
import { toast } from "../utils/toast";

function renderProductDetails(product) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const productImage = document.querySelector(".img");
    const productName = document.querySelector(".namePro");
    const productPrice = document.querySelector(".current-price");
    const productInfo = document.querySelector(".product-short-detail");
    const nameProduct_Bar = document.querySelector(".nameProduct_Bar")

    if(productImage) productImage.src = product.anhsp
    if(productName) productName.textContent = product.tensp
    if(productPrice) productPrice.textContent = VND.format(product.giaban);
    if(productInfo) productInfo.textContent = product.thongtinsp
    if(nameProduct_Bar) nameProduct_Bar.textContent = product.tensp;
}
function AddToCart(product) {
    const quantity = document.querySelector("#quantity");
    const AddToCartForm = document.querySelector("#AddToCartForm");
    AddToCartForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            id_customer: parseInt(localStorage.getItem('login_id')),
            idsp: product.idsp,
            idloaisp: product.idloaisp,
            anhsp: product.anhsp,
            tensp: product.tensp,
            giaban: product.giaban,
            quantity: parseInt(quantity.value),
            dateAdded: "2023-10-20T17:01:46.598Z",
        }
        await cartAPI.addCartItem(data);
        toast.success("Thêm sản phẩm vào giỏ hàng thành công");
        setTimeout(() => {
            window.location.assign("./cart.html");
        },1000)
    })
}

(async ()=>{
    try {
        const searchParams = new URLSearchParams(window.location.search);
        const productId = searchParams.get("id");
        const {arrayProduct} = await productApi.getProductById(productId);
        const [product] = arrayProduct
        renderProductDetails(product)
        AddToCart(product)
    }
    catch(error) {
        console.log('failed to fetch post detail: ', error);
    }
})();