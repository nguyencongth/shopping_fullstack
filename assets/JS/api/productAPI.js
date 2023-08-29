import axiosClient from "./axiosClient";
const productApi = {
  getAll(page, pageSize) {
    const url = "/api/Product/all";
    const params = { page, pageSize };
    return axiosClient.get(url, { params });
  },
  // getPaginatedProducts(page, pageSize) {
  //   const url = "/api/Product/paginated";
  //   const params = { page, pageSize };
  //   return axiosClient.get(url, { params });
  // },
};

export default productApi;
