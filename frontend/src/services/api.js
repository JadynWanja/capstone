import axios from 'axios';

// Default active production backend URL provided by user
const PRODUCTION_BACKEND_URL = 'https://cadre-hub-backend.onrender.com/api';

const envApiUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || PRODUCTION_BACKEND_URL;

let rawUrl = envApiUrl.trim();

if (!rawUrl) {
  rawUrl = PRODUCTION_BACKEND_URL;
}

if (rawUrl.endsWith('/')) {
  rawUrl = rawUrl.slice(0, -1);
}
if (!rawUrl.endsWith('/api')) {
  rawUrl = `${rawUrl}/api`;
}

const API_BASE_URL = rawUrl;

console.log('[API Service] Connected to Active Backend URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hrms_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth failures globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('hrms_token');
      localStorage.removeItem('hrms_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
