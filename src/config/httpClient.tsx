import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:4000", // Thay thế bằng API URL của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

// Middleware để thêm access token vào mỗi request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // Hoặc lấy từ context, Redux
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
