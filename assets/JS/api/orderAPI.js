import axiosClient from "./axiosClient";
const orderAPI = {
  addOrder(data) {
    const url = "/api/Orders/order";
    return axiosClient.post(url, data);
  },
};

export default orderAPI;
