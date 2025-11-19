// src/pages/toko/DashboardToko.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/toko/Sidebar';
import { useToko } from '../../context/TokoContext';
import {  FaShoppingBasket, FaClock, FaExclamationTriangle, FaDownload, FaCheck, FaTrash, FaEdit } from 'react-icons/fa';
import '../../styles/toko/toko-base.css';
import '../../styles/toko/dashboard_toko.css';

const DashboardToko = () => {
  const { tokoData } = useToko();
  const [mods, setMods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load mods from localStorage
    const savedMods = JSON.parse(localStorage.getItem('mods')) || [];
    setMods(savedMods);
    
    // Update toko info in localStorage for sidebar
    if (tokoData) {
      localStorage.setItem('namaToko', tokoData.namaToko);
      localStorage.setItem('emailToko', tokoData.email);
      localStorage.setItem('fotoToko', tokoData.fotoProfil || '');
    }
  }, [tokoData]);

  const hapusMod = (index) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus mod ini?')) {
      const newMods = mods.filter((_, i) => i !== index);
      setMods(newMods);
      localStorage.setItem('mods', JSON.stringify(newMods));
    }
  };

  const editMod = (index) => {
    localStorage.setItem('editIndex', index);
    navigate('/toko/edit-mod');
  };
  const formatHarga = (harga) => {
    if (!harga || harga === 0) return 'Gratis';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(harga);
  };

  const previewMod = (index) => {
    navigate(`/toko/preview/${index}`);
  };

  return (
    <div className="toko-container">
      <Sidebar />
      
      <main className="toko-main">
        <h1>Dashboard</h1>

        <div className="toko-cards">
          <div className="toko-card">
            <h4>Total Pendapatan</h4>
            <p className="toko-value">Rp. 100.000</p>
          </div>
          <div className="toko-card">
            <h4>Total Item</h4>
            <p className="toko-value">{mods.length} Item</p>
          </div>
          <div className="toko-card">
            <h4>Total Pesanan</h4>
            <p className="toko-value">5 Pesanan</p>
          </div>
        </div>

        <h2>Mods Saya</h2>
        <div className="toko-items">
          {mods.length === 0 ? (
            <div className="toko-no-mods">
              <p>Belum ada mods yang diupload.</p>
              <button 
                className="toko-upload-first-btn"
                onClick={() => navigate('/toko/upload')}
              >
                Upload Mod Pertama
              </button>
            </div>
            
          ) : (
            mods.map((mod, index) => (
              <div key={index} className="toko-item-card" onClick={() => previewMod(index)}>
                <img 
                  src={mod.gambar && mod.gambar.length > 0 ? mod.gambar[0] : '/Img/default.jpg'} 
                  alt={mod.nama} 
                  className="toko-item-image"
                />
                <div className="toko-item-info">
                  <div className="toko-item-title">{mod.nama}</div>
                  <div className="toko-item-description">
                    {mod.deskripsi ? mod.deskripsi.substring(0, 100) + '...' : 'Tidak ada deskripsi'}
                  </div>
                  <div className="toko-item-meta">
                    <span className="toko-item-category">{mod.kategori || 'ETS2'}</span>
                    <span className="toko-item-date">
                      {mod.createdAt ? new Date(mod.createdAt).toLocaleDateString('id-ID') : 'Tidak diketahui'}
                    </span>
                  </div>
                </div>
                <div className="toko-price">
                    {formatHarga(mod.harga)}
                </div>
                <div className="toko-actions" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="toko-action-btn toko-edit-btn"
                    onClick={() => editMod(index)}
                    title="Edit Mod"
                  >
                    <FaEdit/>
                  </button>
                  <button 
                    className="toko-action-btn toko-delete-btn"
                    onClick={() => hapusMod(index)}
                    title="Hapus Mod"
                  >
                    <FaTrash/>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardToko;