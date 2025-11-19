// src/components/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaHome, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { useCartContext } from '../../context/CartContext';

const Header = () => {
  const { cartCount } = useCartContext();

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <FaGamepad /> WARMOD
          </Link>
          
          <div className="nav-links">
            <Link to="/" className="home-link">
              <FaHome /> HOME
            </Link>
          </div>
          
          <div className="search-bar">
            <input type="text" placeholder="Cari produk..." />
            <button type="button">
              <FaSearch />
            </button>
          </div>
          
          <div className="auth-links">
            <Link to="/checkout" className="cart-link">
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            <Link to="/profile">
              <FaUser /> Lasmanaadit
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;