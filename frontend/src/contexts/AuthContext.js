import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const res = await api.getProfile(token);
          const data = await res.json();
          
          if (data.user) {
            setUser(data.user);
          } else {
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = async (credentials) => {
    try {
      const res = await api.login(credentials);
      const data = await res.json();
      
      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.register(userData);
      const data = await res.json();
      return { success: res.ok, message: data.message };
    } catch (error) {
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    return true;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin || false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};