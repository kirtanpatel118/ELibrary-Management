import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Attach JWT to every outgoing request
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const PUBLIC_PATHS = ['/login', '/register', '/otp-verification', '/forgot-password'];

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const currentPath = window.location.pathname;
    const isPublic = PUBLIC_PATHS.some(p => currentPath.startsWith(p));

    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      if (!isPublic) navigate('/login');
      return;
    }

    axios.get('http://localhost:3000/user/auth', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.data.ok) {
          setAuthUser(response.data.user);
          setIsLoggedIn(true);
          localStorage.setItem('user_role', response.data.user.role);
          localStorage.setItem('user_email', response.data.user.email);
        } else {
          localStorage.removeItem('jwt_token');
          setIsLoggedIn(false);
          if (!isPublic) navigate('/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('jwt_token');
        setIsLoggedIn(false);
        if (!isPublic) navigate('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
