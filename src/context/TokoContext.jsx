// src/context/TokoContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TokoContext = createContext();

export const TokoProvider = ({ children }) => {
  const [tokoStatus, setTokoStatus] = useState(null);
  const [tokoData, setTokoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTokoStatus = localStorage.getItem('warmodTokoStatus');
    const savedTokoData = localStorage.getItem('warmodTokoData');
    
    if (savedTokoStatus) {
      setTokoStatus(savedTokoStatus);
    }
    if (savedTokoData) {
      setTokoData(JSON.parse(savedTokoData));
    }
    setLoading(false);
  }, []);

  const updateTokoStatus = useCallback((status, data = null) => {
    setTokoStatus(status);
    if (data) {
      setTokoData(data);
      localStorage.setItem('warmodTokoData', JSON.stringify(data));
    }
    localStorage.setItem('warmodTokoStatus', status);
  }, []);

  const buatToko = useCallback((tokoData) => {
    const newTokoData = {
      ...tokoData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    
    updateTokoStatus('seller', newTokoData);
    return newTokoData;
  }, [updateTokoStatus]);

  const value = {
    tokoStatus,
    tokoData,
    updateTokoStatus,
    buatToko,
    loading
  };

  return (
    <TokoContext.Provider value={value}>
      {children}
    </TokoContext.Provider>
  );
};

export const useToko = () => {
  const context = useContext(TokoContext);
  if (!context) {
    throw new Error('useToko must be used within a TokoProvider');
  }
  return context;
};