// src/context/TokoContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TokoContext = createContext();

export const useToko = () => {
  const context = useContext(TokoContext);
  if (!context) {
    throw new Error('useToko must be used within a TokoProvider');
  }
  return context;
};

export const TokoProvider = ({ children }) => {
  const [tokoStatus, setTokoStatus] = useState(null);
  const [tokoData, setTokoData] = useState(null);

  // Stabilkan fungsi dengan useCallback
  const updateTokoStatus = useCallback((status, data = null) => {
    setTokoStatus(status);
    if (status) {
      localStorage.setItem('tokoStatus', status);
    } else {
      localStorage.removeItem('tokoStatus');
    }
    
    if (data) {
      setTokoData(data);
      localStorage.setItem('tokoData', JSON.stringify(data));
    } else {
      setTokoData(null);
      localStorage.removeItem('tokoData');
    }
  }, []);

  useEffect(() => {
    // Load toko status from localStorage hanya sekali saat mount
    const savedTokoStatus = localStorage.getItem('tokoStatus');
    const savedTokoData = localStorage.getItem('tokoData');
    
    if (savedTokoStatus) {
      setTokoStatus(savedTokoStatus);
    }
    
    if (savedTokoData) {
      setTokoData(JSON.parse(savedTokoData));
    }
  }, []); // Empty dependency array - hanya dijalankan sekali

  const buatToko = useCallback((tokoData) => {
    const newTokoData = {
      namaToko: tokoData.namaToko,
      pemilik: tokoData.pemilik,
      deskripsi: tokoData.deskripsi,
      email: tokoData.email,
      fotoProfil: tokoData.fotoProfil || null,
      createdAt: new Date().toISOString()
    };
    
    updateTokoStatus('seller', newTokoData);
    return newTokoData;
  }, [updateTokoStatus]);

  const value = {
    tokoStatus,
    tokoData,
    updateTokoStatus,
    buatToko
  };

  return (
    <TokoContext.Provider value={value}>
      {children}
    </TokoContext.Provider>
  );
};