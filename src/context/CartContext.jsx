// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { useCart } from '../hooks/useCart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cart = useCart();

  // Listen untuk cart updates dari komponen lain
  useEffect(() => {
    const handleCartUpdate = () => {
      cart.loadCartData(); // Reload data ketika ada update
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [cart]);

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};