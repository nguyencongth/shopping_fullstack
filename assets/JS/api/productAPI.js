import axiosClient from "./axiosClient";
const productApi = {
  getAll(page, pageSize) {
    const url = "/api/Product/all";
    const params = { page, pageSize };
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
};

export default productApi;
