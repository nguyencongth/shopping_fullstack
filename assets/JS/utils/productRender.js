export function createProductElement(product) {
  if (!product) return;
  const postTemplate = document.getElementById("postTemplate");
  if (!postTemplate) return;

  const productItem = postTemplate.content.firstElementChild.cloneNode(true);

  if (!productItem) return;

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const product_image_item = productItem.querySelector(".product-image-item");
  const image_title = productItem.querySelector(".image-title");
  const current_price = productItem.querySelector(".current-price");

  if (product_image_item) product_image_item.src = product.anhsp;
  if (image_title) image_title.textContent = product.tensp;
  if (current_price) current_price.textContent = VND.format(product.giaban);

  if(productItem) {
    productItem.addEventListener("click",()=>{
      setTimeout(()=>{
        window.location.assign(`/assets/HTML/productDetail.html?id=${product.idsp}`);
      }, 200)
    })
  }

  return productItem;
}

export function renderProductList(elementId, products) {
  if (!Array.isArray(products)) return;
  const listElements = document.getElementById(elementId);
  if (!listElements) return;

  listElements.textContent = "";

  products.forEach((product) => {
    const productItem = createProductElement(product);
    listElements.appendChild(productItem);
  });
}
