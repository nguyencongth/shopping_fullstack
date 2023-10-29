import axiosClient from "./axiosClient";
const productApi = {
  getAll(priceRange,page, pageSize) {
    const url = "/api/Product/all";
    const params = {priceRange, page, pageSize };
    return axiosClient.get(url, { params });
  },
  getProductsDress(page, pageSize) {
    const url = "/api/Product/productDress";
    const params = { page, pageSize };
    return axiosClient.get(url, { params });
  },
  getProductsShirt(page, pageSize) {
    const url = "/api/Product/productShirt";
    const params = { page, pageSize };
    return axiosClient.get(url, { params });
  },
  getProductById(id) {
    const url = `/api/Product/getProductId?idsp=${id}`
    return axiosClient.get(url);
  },
  searchProduct(keyword, page, pageSize) {
    const url = `/api/Product/searchProduct?keyword=${keyword}&page=${page}&pageSize=${pageSize}`;
    return axiosClient.get(url);
  },
  filterProductsByPrice(priceRange, page, pageSize) {
    const url = `/api/Product/filterProductsByPrice?priceRange=${priceRange}&page=${page}&pageSize=${pageSize}`;
    return axiosClient.get(url);
  },
};

export default productApi;
