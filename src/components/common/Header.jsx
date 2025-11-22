// src/components/common/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGamepad, FaHome, FaShoppingCart, FaUser, FaSearch, FaSignInAlt } from 'react-icons/fa';
import { useCartContext } from '../../context/CartContext';
import { useUserAuth } from '../../context/UserAuthContext';
import { useSearch } from '../../context/SearchContext'; // IMPORT BARU

const Header = () => {
  const { cartCount } = useCartContext();
  const { user, isAuthenticated } = useUserAuth();
  const { searchTerm, setSearchTerm } = useSearch(); // GUNAKAN SEARCH CONTEXT
  const [localSearch, setLocalSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Sync local state dengan context
  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      const term = localSearch.trim();
      if (term) {
        // Set search term ke context
        setSearchTerm(term);
        
        // Jika belum di halaman products, redirect ke products
        if (!location.pathname.includes('/products')) {
          navigate('/products');
        }
        
        // Clear input setelah search
        setLocalSearch('');
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    
    // Jika input dikosongkan, clear search term
    if (!value.trim()) {
      setSearchTerm('');
    }
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <Link to={isAuthenticated ? "/" : "/before-login"} className="logo">
            <FaGamepad /> WARMOD
          </Link>
          
          <div className="nav-links">
            <Link to={isAuthenticated ? "/" : "/before-login"} className="home-link">
              <FaHome /> HOME
            </Link>
          </div>
          
          {/* SEARCH BAR */}
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Cari produk, kategori, atau seller..." 
              value={localSearch}
              onChange={handleInputChange}
              onKeyPress={handleSearch}
            />
            <button type="button" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
          
          <div className="auth-links">
            {isAuthenticated && (
              <Link to="/checkout" className="cart-link">
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="cart-count" key={cartCount}>
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            
            {isAuthenticated ? (
              <Link to="/profile">
                <FaUser /> {user?.name || 'User'}
              </Link>
            ) : (
              <Link to="/login" className="login-btn">
                <FaSignInAlt /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;