import axios from 'axios';

// 1. Set the Base URL to your confirmed working Render link
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:10000/api' 
  : 'https://aquaconnect-backend-bd5g.onrender.com/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 2. Add Token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 3. Auth API
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  sendOTP: (data) => api.post('/auth/send-otp', data),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  getMe: () => api.get('/auth/me'),
};

// 4. Complaints API
export const complaintAPI = {
  submit: (data) => api.post('/complaints', data),
  getAll: () => api.get('/complaints'),
  getMyComplaints: () => api.get('/complaints/my'),
  getById: (id) => api.get(`/complaints/${id}`),
  updateStatus: (id, status) => api.put(`/complaints/${id}/status`, { status }),
  getStats: () => api.get('/complaints/stats'),
};

// 5. Water API
export const waterAPI = {
  getSupply: () => api.get('/water/supply'),
  getQuality: () => api.get('/water/quality'),
};

export default api;