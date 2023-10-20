import axiosClient from "./axiosClient";
const cartAPI = {
  getCartItem(id) {
    const url = `/api/Cart/showCartItem?customerID=${id}`;
    return axiosClient.get(url);
  },
  addCartItem(data) {
    const url = "/api/Cart/addToCart";
    return axiosClient.post(url, data);
  },
};

export default cartAPI;
