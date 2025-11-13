
import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });


// Add token automatically if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);
export const uploadResume = (formData) =>
  API.post("/upload-resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
