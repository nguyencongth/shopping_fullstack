import productApi from "../api/productAPI";
import { renderProductList } from "../utils/productRender";
async function getProduct() {
  const { arrayProduct } = await productApi.getAll();
  console.log(arrayProduct);
  renderProductList("product__List", arrayProduct);
}

getProduct();
