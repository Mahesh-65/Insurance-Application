import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000/api' : `${window.location.origin}/api`);

const api = axios.create({
  baseURL
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('insurance-auth');
  if (stored) {
    const auth = JSON.parse(stored);
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
  }
  return config;
});

export default api;
