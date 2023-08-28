import axiosClient from "./axiosClient";
const productApi = {
  getAll(params) {
    const url = "/api/Product/all";
    return axiosClient.get(url, { params });
  },
};

export default productApi;
