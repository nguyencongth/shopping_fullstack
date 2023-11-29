import axios from "axios";
const axiosClient = axios.create({
  baseURL: "http://congthanh279-001-site1.ftempurl.com",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    //transform data for all response
    return response.data;
  },
  function (error) {
    if (!error.response)
      throw new Error("Network error. Please try again later. ");
    return Promise.reject(error);
  }
);

export default axiosClient;
