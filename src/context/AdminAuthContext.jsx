import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const checkAdminLogin = () => {
      const isLogin = localStorage.getItem('isAdminLogin') === 'true';
      const adminName = localStorage.getItem('adminNama') || 'Admin';
      const adminEmail = localStorage.getItem('adminEmail') || 'admin@gmail.com';
      
      setIsAdminLoggedIn(isLogin);
      setAdminData({
        nama: adminName,
        email: adminEmail
      });
      setLoading(false);
    };

    checkAdminLogin();
  }, []);

  const login = (email, password) => {
    // Simple validation - in real app, this would be API call
    if (email === 'admin@warmod.com' && password === 'admin123') {
      localStorage.setItem('isAdminLogin', 'true');
      localStorage.setItem('adminNama', 'Admin');
      localStorage.setItem('adminEmail', email);
      
      setIsAdminLoggedIn(true);
      setAdminData({
        nama: 'Admin',
        email: email
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isAdminLogin');
    localStorage.removeItem('adminNama');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminFoto');
    
    setIsAdminLoggedIn(false);
    setAdminData(null);
  };

  const value = {
    isAdminLoggedIn,
    adminData,
    loading,
    login,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};