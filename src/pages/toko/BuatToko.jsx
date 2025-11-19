// src/pages/toko/BuatToko.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToko } from '../../context/TokoContext';
import { useAuth } from '../../context/AuthContext';
import '../../styles/toko/toko-base.css';
import '../../styles/toko/buat_toko.css';

const BuatToko = () => {
  const navigate = useNavigate();
  const { buatToko } = useToko();
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    namaToko: '',
    pemilik: user?.name || '', // Auto-fill dengan nama user
    deskripsi: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;

    try {
      setLoading(true);
      
      // Validate form
      if (!formData.namaToko.trim() || !formData.pemilik.trim() || !formData.deskripsi.trim()) {
        alert('Harap isi semua field yang diperlukan');
        return;
      }

      // Update user profile dengan nama pemilik
      if (formData.pemilik !== user?.name) {
        updateUserProfile({ name: formData.pemilik });
      }

      // Create toko
      const tokoData = buatToko({
        ...formData,
        email: user?.email || localStorage.getItem('email') || 'toko@gmail.com'
      });

      // Save nama pemilik ke localStorage untuk profil toko
      localStorage.setItem('namaPemilik', formData.pemilik);
      localStorage.setItem('namaToko', formData.namaToko);
      localStorage.setItem('deskripsi', formData.deskripsi);

      // Show success message
      alert('Toko berhasil dibuat! Mengarahkan ke dashboard...');
      
      // Redirect to dashboard
      navigate('/toko/dashboard');
      
    } catch (error) {
      console.error('Error creating store:', error);
      alert('Error membuat toko. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="toko-buat-container">
      <div className="toko-buat-content">
        <div className="toko-buat-header">
          <h1>Buat Toko Anda</h1>
          <p>Lengkapi informasi toko Anda untuk memulai berjualan</p>
        </div>

        <form className="toko-buat-form" onSubmit={handleSubmit}>
          <div className="toko-form-group">
            <label htmlFor="namaToko">Nama Toko *</label>
            <input 
              type="text" 
              id="namaToko"
              value={formData.namaToko}
              onChange={handleInputChange}
              placeholder="Masukkan nama toko Anda"
              required
              disabled={loading}
              className="toko-form-input"
            />
            <small>Nama toko akan ditampilkan kepada pembeli</small>
          </div>
          
          <div className="toko-form-group">
            <label htmlFor="pemilik">Nama Pemilik *</label>
            <input 
              type="text" 
              id="pemilik"
              value={formData.pemilik}
              onChange={handleInputChange}
              placeholder="Masukkan nama lengkap pemilik"
              required
              disabled={loading}
              className="toko-form-input"
            />
            <small>Nama pemilik untuk verifikasi</small>
          </div>
          
          <div className="toko-form-group">
            <label htmlFor="deskripsi">Deskripsi Toko *</label>
            <textarea 
              id="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              placeholder="Jelaskan tentang toko dan produk Anda..."
              required
              disabled={loading}
              className="toko-form-textarea"
              rows="4"
            ></textarea>
            <small>Deskripsi akan membantu pembeli memahami toko Anda</small>
          </div>

          <div className="toko-form-actions">
            <button 
              type="button"
              className="toko-btn toko-btn-outline"
              onClick={() => navigate('/toko/terms')}
              disabled={loading}
            >
              Kembali
            </button>
            <button 
              type="submit" 
              className="toko-btn toko-btn-primary"
              disabled={loading}
            >
              {loading ? 'Membuat Toko...' : 'Buat Toko Sekarang'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuatToko;