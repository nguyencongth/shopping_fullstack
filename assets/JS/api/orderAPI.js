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
  deleteOrder(orderID) {
    const url = `/api/Orders/deleteOrder?orderID=${orderID}`;
    return axiosClient.delete(url);
  },
};

export default orderAPI;
