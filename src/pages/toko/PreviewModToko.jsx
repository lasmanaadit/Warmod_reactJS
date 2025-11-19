// src/pages/toko/PreviewModToko.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/toko/Sidebar';
import { useToko } from '../../context/TokoContext';
import '../../styles/toko/toko-base.css';
import '../../styles/toko/preview_mod_toko.css';

const PreviewModToko = () => {
  const { modId } = useParams();
  const navigate = useNavigate();
  const { tokoData } = useToko();
  const [mod, setMod] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Load mod data from localStorage
    const mods = JSON.parse(localStorage.getItem('mods')) || [];
    const foundMod = mods[modId];
    
    if (foundMod) {
      setMod(foundMod);
    } else {
      navigate('/toko/dashboard');
    }
  }, [modId, navigate]);

  const handleEdit = () => {
    localStorage.setItem('editIndex', modId);
    navigate('/toko/edit-mod');
  };

  const handleBack = () => {
    navigate('/toko/dashboard');
  };

  const nextImage = () => {
    if (mod && mod.gambar && mod.gambar.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === mod.gambar.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (mod && mod.gambar && mod.gambar.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? mod.gambar.length - 1 : prev - 1
      );
    }
  };

  const formatHarga = (harga) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(harga);
  };

  if (!mod) {
    return (
      <div className="toko-container">
        <Sidebar />
        <main className="toko-main">
          <div className="toko-loading">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="toko-container">
      <Sidebar />
      
      <main className="toko-main">
        <div className="toko-preview-header">
          <button className="toko-back-btn" onClick={handleBack}>
            ← Kembali ke Dashboard
          </button>
          <div className="toko-preview-actions">
            <button className="toko-edit-btn" onClick={handleEdit}>
              Edit Mod
            </button>
          </div>
        </div>

        <div className="toko-preview-content">
          {/* Image Gallery */}
          <div className="toko-preview-gallery">
            <div className="toko-main-image">
              {mod.gambar && mod.gambar.length > 0 ? (
                <>
                  <img 
                    src={mod.gambar[currentImageIndex]} 
                    alt={mod.nama}
                    className="toko-preview-main-img"
                  />
                  {mod.gambar.length > 1 && (
                    <>
                      <button className="toko-gallery-nav toko-prev-btn" onClick={prevImage}>
                        ‹
                      </button>
                      <button className="toko-gallery-nav toko-next-btn" onClick={nextImage}>
                        ›
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="toko-no-image-large">
                  <span>No Image</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {mod.gambar && mod.gambar.length > 1 && (
              <div className="toko-thumbnail-container">
                {mod.gambar.map((img, index) => (
                  <div 
                    key={index}
                    className={`toko-thumbnail ${index === currentImageIndex ? 'toko-active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="toko-preview-details">
            <div className="toko-preview-badge">
              <span className="toko-status-badge">Published</span>
              <span className="toko-category-badge">{mod.kategori || 'ETS2'}</span>
            </div>

            <h1 className="toko-preview-title">{mod.nama}</h1>
            
            {/* Harga Section */}
            <div className="toko-preview-harga">
              <div className="toko-harga-label">Harga</div>
              <div className="toko-harga-value">
                {mod.harga ? formatHarga(mod.harga) : 'Gratis'}
              </div>
            </div>
            
            <div className="toko-preview-meta">
              <div className="toko-meta-item">
                <span className="toko-meta-label">Toko:</span>
                <span className="toko-meta-value">{mod.toko || tokoData?.namaToko || 'Toko Saya'}</span>
              </div>
              <div className="toko-meta-item">
                <span className="toko-meta-label">Tanggal Upload:</span>
                <span className="toko-meta-value">
                  {mod.createdAt ? new Date(mod.createdAt).toLocaleDateString('id-ID') : 'Tidak diketahui'}
                </span>
              </div>
              {mod.updatedAt && (
                <div className="toko-meta-item">
                  <span className="toko-meta-label">Terakhir Diupdate:</span>
                  <span className="toko-meta-value">
                    {new Date(mod.updatedAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
              )}
            </div>

            <div className="toko-preview-description">
              <h3>Deskripsi</h3>
              <p>{mod.deskripsi || 'Tidak ada deskripsi'}</p>
            </div>

            <div className="toko-preview-download">
              <h3>Download Link</h3>
              <div className="toko-download-link">
                <input 
                  type="text" 
                  value={mod.link || ''} 
                  readOnly 
                  className="toko-link-input"
                />
                <button 
                  className="toko-copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(mod.link);
                    alert('Link berhasil disalin!');
                  }}
                >
                  Salin Link
                </button>
              </div>
            </div>

            <div className="toko-preview-stats">
              <div className="toko-stat-item">
                <span className="toko-stat-number">0</span>
                <span className="toko-stat-label">Total Dilihat</span>
              </div>
              <div className="toko-stat-item">
                <span className="toko-stat-number">0</span>
                <span className="toko-stat-label">Total Download</span>
              </div>
              <div className="toko-stat-item">
                <span className="toko-stat-number">0</span>
                <span className="toko-stat-label">Total Terjual</span>
              </div>
              <div className="toko-stat-item">
                <span className="toko-stat-number">
                  {mod.harga ? formatHarga(mod.harga) : '0'}
                </span>
                <span className="toko-stat-label">Harga</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreviewModToko;