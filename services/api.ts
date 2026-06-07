import axios from "axios";

const getBaseURL = () => {
  let url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
  
  // Remove trailing slash if present
  url = url.replace(/\/+$/, "");
  
  // Append /api/v1 if not already present
  if (!url.toLowerCase().includes("/api/v1")) {
    url = `${url}/api/v1`;
  }
  
  const finalUrl = url;
  if (typeof window !== "undefined") {
    console.log("API Configured with Base URL:", finalUrl);
  }
  return finalUrl;
};

export const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// Add a request interceptor to include the Bearer token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);