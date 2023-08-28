import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://localhost:7249",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
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
