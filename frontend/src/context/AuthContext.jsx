import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const storageKey = 'insurance-auth';
const getApiErrorMessage = (error, fallback) => error?.response?.data?.message || fallback;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : { token: '', user: null };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(auth));
  }, [auth]);

  const login = async (payload) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', payload);
      setAuth({ token: data.token, user: data.user });
      return data.user;
    } catch (error) {
      const message = getApiErrorMessage(error, 'Login failed');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/register', payload);
      setAuth({ token: data.token, user: data.user });
      return data.user;
    } catch (error) {
      const message = getApiErrorMessage(error, 'Registration failed');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setError('');
    setAuth({ token: '', user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, register, logout, loading, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
