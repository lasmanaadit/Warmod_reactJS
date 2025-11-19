// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { TokoProvider, useToko } from './TokoContext';

const AuthContext = createContext();

// Inner provider component untuk mengakses TokoContext
const AuthProviderInner = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { updateTokoStatus } = useToko();

  // Gunakan useCallback untuk stabilkan fungsi
  const syncTokoStatus = useCallback(() => {
    const tokoStatus = localStorage.getItem('tokoStatus');
    if (tokoStatus) {
      const tokoData = localStorage.getItem('tokoData');
      updateTokoStatus(tokoStatus, tokoData ? JSON.parse(tokoData) : null);
    }
  }, [updateTokoStatus]);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('warmodProfile');
    const isLoggedIn = localStorage.getItem('warmodIsLoggedIn');
    
    if (savedUser && isLoggedIn) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Sync toko status setelah user di-set
      syncTokoStatus();
    }
    setLoading(false);
  }, [syncTokoStatus]); // Hanya depend on syncTokoStatus yang sudah di-stabilkan

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('warmodProfile', JSON.stringify(userData));
    localStorage.setItem('warmodIsLoggedIn', 'true');
    
    // Sync toko status setelah login
    syncTokoStatus();
  }, [syncTokoStatus]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('warmodProfile');
    localStorage.removeItem('warmodIsLoggedIn');
    
    // Reset toko status on logout
    updateTokoStatus(null, null);
  }, [updateTokoStatus]);

  const register = useCallback((userData) => {
    // Default status untuk user baru adalah 'user'
    const newUser = {
      ...userData,
      role: 'user', // Default role
      createdAt: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('warmodProfile', JSON.stringify(newUser));
    localStorage.setItem('warmodIsLoggedIn', 'true');
    
    // Set default toko status untuk user baru
    updateTokoStatus('user', null);
  }, [updateTokoStatus]);

  const updateUserProfile = useCallback((updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('warmodProfile', JSON.stringify(updatedUser));
  }, [user]);

  const value = {
    user,
    login,
    logout,
    register,
    updateUserProfile,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Main AuthProvider yang wrap dengan TokoProvider
export const AuthProvider = ({ children }) => {
  return (
    <TokoProvider>
      <AuthProviderInner>
        {children}
      </AuthProviderInner>
    </TokoProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};