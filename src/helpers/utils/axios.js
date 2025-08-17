// utils/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // তোমার backend URL
});

// Request interceptor – প্রতিটা request এর আগে
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // localStorage থেকে token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // header attach
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional) – global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Token invalid or expired.");
      // চাইলে এখানে logout বা redirect করতে পারো
    }
    return Promise.reject(error);
  }
);

export default api;
