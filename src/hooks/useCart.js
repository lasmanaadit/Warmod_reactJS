// src/hooks/useCart.js
import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart data dari localStorage
  useEffect(() => {
    loadCartData();
    
    // Listen untuk cart updates dari window
    const handleStorageChange = () => {
      loadCartData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  const loadCartData = () => {
    const savedCart = localStorage.getItem('warmodCartItems');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      setCartCount(items.length);
    } else {
      setCartItems([]);
      setCartCount(0);
    }
  };

  const addToCart = (productData) => {
    // Generate unique ID untuk setiap item di cart
    const cartItem = {
      ...productData,
      cartId: Date.now() + Math.random(), // Unique ID untuk setiap item
      quantity: 1
    };
    
    const newItems = [...cartItems, cartItem];
    
    // Update state
    setCartItems(newItems);
    setCartCount(newItems.length);
    
    // Simpan ke localStorage
    localStorage.setItem('warmodCartItems', JSON.stringify(newItems));
    localStorage.setItem('warmodCartCount', newItems.length.toString());
    
    // Trigger custom event untuk real-time updates
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'warmodCartItems',
      newValue: JSON.stringify(newItems)
    }));
    
    console.log('Added to cart:', cartItem);
    return newItems.length;
  };

  const removeFromCart = (cartId) => {
    const newItems = cartItems.filter(item => item.cartId !== cartId);
    
    // Update state
    setCartItems(newItems);
    setCartCount(newItems.length);
    
    // Update localStorage
    localStorage.setItem('warmodCartItems', JSON.stringify(newItems));
    localStorage.setItem('warmodCartCount', newItems.length.toString());
    
    // Trigger events
    window.dispatchEvent(new Event('cartUpdated'));
    
    return newItems.length;
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('warmodCartItems');
    localStorage.removeItem('warmodCartCount');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateCartItemQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    
    const newItems = cartItems.map(item => 
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(newItems);
    localStorage.setItem('warmodCartItems', JSON.stringify(newItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItemQuantity,
    loadCartData
  };
};