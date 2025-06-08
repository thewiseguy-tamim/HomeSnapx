import axios from "axios";

const authApiClient = axios.create({
  baseURL: "https://household-service.vercel.app",
  // baseURL: "http://127.0.0.1:8000/",
});

export default authApiClient;

authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      config.headers.Authorization = `JWT ${JSON.parse(token)?.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);