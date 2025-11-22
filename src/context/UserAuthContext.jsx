// src/context/UserAuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('warmodProfile');
    const isLoggedIn = localStorage.getItem('warmodIsLoggedIn');
    
    if (isLoggedIn === 'true' && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Dummy accounts
    const dummyAccounts = {
      'user@example.com': { password: 'password123', name: 'Lasmanaadit' },
      'test@example.com': { password: 'test123', name: 'Test User' },
      'demo@example.com': { password: 'demo123', name: 'Demo User' }
    };

    if (dummyAccounts[email] && dummyAccounts[email].password === password) {
      const userData = {
        name: dummyAccounts[email].name,
        email: email
      };
      
      setUser(userData);
      localStorage.setItem('warmodProfile', JSON.stringify(userData));
      localStorage.setItem('warmodIsLoggedIn', 'true');
      return { success: true, user: userData };
    }
    return { success: false, error: 'Email atau password salah!' };
  };

  const register = (fullname, email, password) => {
    const userData = {
      name: fullname,
      email: email
    };
    
    setUser(userData);
    localStorage.setItem('warmodProfile', JSON.stringify(userData));
    localStorage.setItem('warmodIsLoggedIn', 'true');
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('warmodProfile');
    localStorage.removeItem('warmodIsLoggedIn');
    localStorage.removeItem('warmodCartItems');
    localStorage.removeItem('warmodCartCount');
  };

  const updateUserProfile = (profileData) => {
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('warmodProfile', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUserProfile,
    isAuthenticated: !!user,
    loading
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within an UserAuthProvider');
  }
  return context;
};