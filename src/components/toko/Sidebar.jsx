// src/components/toko/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useToko } from '../../context/TokoContext';
import { FaGamepad, FaHome, FaShoppingCart, FaUser, FaSearch, FaUpload, FaMoneyBill } from 'react-icons/fa';
import '../../styles/toko/toko-base.css';

const Sidebar = () => {
  const location = useLocation();
  const { tokoData } = useToko();

  return (
    <aside className="toko-sidebar">
      <div className="toko-profile">
        <div className="toko-info">
          <h4>{tokoData?.namaToko || "Nama Toko"}</h4>
          <p>{tokoData?.email || "toko@gmail.com"}</p>
        </div>
      </div>
      <nav>
        <Link 
          to="/toko/dashboard" 
          className={location.pathname === '/toko/dashboard' ? 'toko-active' : ''}
        >
          <i></i> Dashboard
        </Link>
        <Link 
          to="/toko/upload" 
          className={location.pathname === '/toko/upload' ? 'toko-active' : ''}
        >
          <i></i> Upload Mod
        </Link>
        <Link 
          to="/toko/transaksi" 
          className={location.pathname === '/toko/transaksi' ? 'toko-active' : ''}
        >
          <i></i> Daftar Transaksi
        </Link>
        <Link 
          to="/toko/profil" 
          className={location.pathname === '/toko/profil' ? 'toko-active' : ''}
        >
          <i></i> Profil Toko
        </Link>
      </nav>
      <div className="toko-logout">
        <a href="/" onClick={(e) => {
          e.preventDefault();
          window.location.href = '/';
        }}>
          <i></i> Keluar Dari Toko
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;