import axios from 'axios';

// Dynamically fetch backend URL from Vercel environment variables or fallback to window origin / local API
const envApiUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';

let rawUrl = envApiUrl.trim();

if (!rawUrl) {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // Default relative fallback when hosted
    rawUrl = `${window.location.origin}/api`;
  } else {
    // Local dev server fallback
    rawUrl = 'http://localhost:5000/api';
  }
}

if (rawUrl.endsWith('/')) {
  rawUrl = rawUrl.slice(0, -1);
}
if (!rawUrl.endsWith('/api')) {
  rawUrl = `${rawUrl}/api`;
}

const API_BASE_URL = rawUrl;

console.log('[API Service] Connected to Backend URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
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
