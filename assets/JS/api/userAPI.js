import axiosClient from "./axiosClient";
const userAPI = {
  login(data) {
    const url = '/api/Customers/Login';
    return axiosClient.post(url,data);
  },
  register(data){
    const url = '/api/Customers/register';
    return axiosClient.post(url, data);
  }
};

export default userAPI;