import axiosClient from "./axiosClient";
const orderAPI = {
  addOrder(data) {
    const url = "/api/Orders/order";
    return axiosClient.post(url, data);
  },
  getOrderByCustomerID(customerID) {
    const url = `/api/Orders/getOrder?customerID=${customerID}`;
    return axiosClient.get(url);
  },
};

export default orderAPI;
