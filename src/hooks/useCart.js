// src/hooks/useCart.js
import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart data dari localStorage
  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = () => {
    const savedCart = localStorage.getItem('warmodCartItems');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      setCartCount(items.length);
    }
  };

  const addToCart = (productData) => {
    const newItems = [...cartItems, productData];
    setCartItems(newItems);
    setCartCount(newItems.length);
    
    // Simpan ke localStorage
    localStorage.setItem('warmodCartItems', JSON.stringify(newItems));
    localStorage.setItem('warmodCartCount', newItems.length.toString());
    
    // Trigger custom event untuk real-time updates
    window.dispatchEvent(new Event('cartUpdated'));
    
    return newItems.length; // Return new count untuk feedback
  };

  const removeFromCart = (index) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
    setCartCount(newItems.length);
    
    // Update localStorage
    localStorage.setItem('warmodCartItems', JSON.stringify(newItems));
    localStorage.setItem('warmodCartCount', newItems.length.toString());
    
    // Trigger custom event
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('warmodCartItems');
    localStorage.removeItem('warmodCartCount');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    clearCart,
    loadCartData
  };
};