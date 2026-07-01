import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    console.log("TOKEN =>", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("AUTH HEADER =>", config.headers.Authorization);
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("========== API ERROR ==========");
    console.error("URL:", error.config?.url);
    console.error("METHOD:", error.config?.method);
    console.error("STATUS:", error.response?.status);
    console.error("DATA:", error.response?.data);
    console.error("FULL ERROR:", error);
    console.error("===============================");

    return Promise.reject(error);
  }
);

export default api;