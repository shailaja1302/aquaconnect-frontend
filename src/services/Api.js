import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const complaintAPI = {
  submit: (data) => api.post("/complaints", data),
  getAll: () => api.get("/complaints"),
  getById: (id) => api.get(`/complaints/${id}`),
  getByArea: (area) => api.get(`/complaints?area=${area}`),
};

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  sendOTP: (aadhaar) => api.post("/auth/send-otp", { aadhaar }),
  verifyOTP: (aadhaar, otp) => api.post("/auth/verify-otp", { aadhaar, otp }),
};

export const waterAPI = {
  getSupplyStatus: () => api.get("/water/supply"),
  getQualityReports: () => api.get("/water/quality"),
};

export default api;