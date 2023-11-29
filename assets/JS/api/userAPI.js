import axiosClient from "./axiosClient";
const userAPI = {
  login(data) {
    const url = '/api/Customers/Login';
    return axiosClient.post(url,data);
  },
  register(data){
    const url = '/api/Customers/register';
    return axiosClient.post(url, data);
  },
  getCustomerById(id) {
    const url = `/api/Customers/getCustomerById?CustomerID=${id}`;
    return axiosClient.get(url);
  },
  changePassword(customerID, currentPassword, newPassword, confirmNewPassword) {
    const url = `/api/Customers/changePassword?customerID=${customerID}&currentPassword=${currentPassword}&newPassword=${newPassword}&confirmNewPassword=${confirmNewPassword}`;
    return axiosClient.patch(url);
  },
  updateInfo(data) {
    const url = `/api/Customers/updateInfo?customerID=${data.id_customer}`;
    return axiosClient.patch(url,data);
  },
};

export default userAPI;