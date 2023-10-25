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
  deleteCart(id) {
    const url = `/api/Cart/deleteCart?customerID=${id}`;
    return axiosClient.delete(url);
  },
  deleteCartItem(customerID, productID) {
    const url = `/api/Cart/deleteCartItem?customerID=${customerID}&productID=${productID}`;
    return axiosClient.delete(url);
  },
  updateCartItemQuantity(data) {
    const url = "/api/Cart/updateCartQuantity"
    return axiosClient.patch(url, data);
  }
};

export default cartAPI;
