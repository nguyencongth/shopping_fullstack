import productApi from "../api/productAPI";

function renderProductDetails(product) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    // const productDetail = document.querySelector("#product-wrapper");
    const productImage = document.querySelector(".img");
    const productName = document.querySelector(".namePro");
    const productPrice = document.querySelector(".current-price");
    const productInfo = document.querySelector(".product-short-detail");
    const nameProduct_Bar = document.querySelector(".nameProduct_Bar")

    console.log(productImage);
    console.log(productName);
    console.log(productPrice);
    console.log(productInfo);

    if(productImage) productImage.src = product.anhsp
    if(productName) productName.textContent = product.tensp
    if(productPrice) productPrice.textContent = VND.format(product.giaban);
    if(productInfo) productInfo.textContent = product.thongtinsp
    if(nameProduct_Bar) nameProduct_Bar.textContent = product.tensp;
}

(async ()=>{
    try {
        const searchParams = new URLSearchParams(window.location.search);
        const productId = searchParams.get("id");
        const {arrayProduct} = await productApi.getProductById(productId);
        const [product] = arrayProduct
        renderProductDetails(product)
    }
    catch(error) {
        console.log('failed to fetch post detail: ', error);
    }
})();