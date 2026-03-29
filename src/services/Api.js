import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const complaintAPI = {
  submit: (data) => api.post("/complaints", data),
  getAll: (params) => api.get("/complaints", { params }),
  getById: (id) => api.get(`/complaints/${id}`),
  getMyComplaints: () => api.get("/complaints/my"),
  updateStatus: (id, status) => api.put(`/complaints/${id}/status`, { status }),
  getStats: () => api.get("/complaints/stats"),
};

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  getMe: () => api.get("/auth/me"),
  sendOTP: (aadhaar) => api.post("/auth/send-otp", { aadhaar }),
  verifyOTP: (aadhaar, otp) => api.post("/auth/verify-otp", { aadhaar, otp }),
};

export const waterAPI = {
  getSupplyStatus: () => api.get("/water/supply"),
  getQualityReports: () => api.get("/water/quality"),
  updateSupplyStatus: (data) => api.post("/water/supply", data),
};
