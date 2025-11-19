// src/pages/toko/EditMod.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/toko/Sidebar';
import { useToko } from '../../context/TokoContext';
import { compressImage } from '../../utils/imageCompressor';
import '../../styles/toko/toko-base.css';
import '../../styles/toko/upload_mod.css';

const EditMod = () => {
  const { tokoData } = useToko();
  const [formData, setFormData] = useState({
    nama: '',
    link: '',
    deskripsi: '',
    harga: '',
    gambar: ['', '', '', '', '']
  });
  const [kategori, setKategori] = useState('ETS2');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalMod, setOriginalMod] = useState(null);

  useEffect(() => {
    const editIndex = localStorage.getItem('editIndex');
    const mods = JSON.parse(localStorage.getItem('mods') || '[]');
    
    if (editIndex && mods[editIndex]) {
      const modToEdit = mods[editIndex];
      setOriginalMod(modToEdit);
      
      // Fill gambar array with existing images + empty slots
      const gambarArray = [...modToEdit.gambar || []];
      while (gambarArray.length < 5) {
        gambarArray.push('');
      }
      
      setFormData({
        nama: modToEdit.nama || '',
        link: modToEdit.link || '',
        deskripsi: modToEdit.deskripsi || '',
        harga: modToEdit.harga?.toString() || '',
        gambar: gambarArray
      });
      setKategori(modToEdit.kategori || 'ETS2');
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFileChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const compressedImage = await compressImage(file);
        const newGambar = [...formData.gambar];
        newGambar[index] = compressedImage;
        setFormData(prev => ({
          ...prev,
          gambar: newGambar
        }));
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Error mengkompres gambar. Coba gambar yang lebih kecil.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageClick = (index) => {
    const fileInput = document.getElementById(`file-input-${index}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;

    try {
      setLoading(true);
      
      const editIndex = localStorage.getItem('editIndex');
      const mods = JSON.parse(localStorage.getItem('mods') || '[]');
      
      if (editIndex && mods[editIndex]) {
        // Filter out empty images but keep at least one
        const filteredGambar = formData.gambar.filter(img => img !== '');
        if (filteredGambar.length === 0) {
          alert('Harap sisakan minimal 1 gambar');
          return;
        }

        if (!formData.harga || parseInt(formData.harga) < 0) {
          alert('Harap masukkan harga yang valid');
          return;
        }

        mods[editIndex] = {
          ...mods[editIndex],
          nama: formData.nama,
          link: formData.link,
          deskripsi: formData.deskripsi,
          harga: parseInt(formData.harga),
          gambar: filteredGambar,
          kategori: kategori,
          updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem('mods', JSON.stringify(mods));
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error updating mod:', error);
      alert('Error menyimpan perubahan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    window.location.href = '/toko/dashboard';
  };

  return (
    <div className="toko-container">
      <Sidebar />
      
      <main className="toko-main">
        <h1>Edit Mods</h1>

        <form className="toko-upload-form" onSubmit={handleSubmit}>
          <label>Nama Mods *</label>
          <input 
            type="text" 
            id="nama"
            value={formData.nama}
            onChange={handleInputChange}
            placeholder="Masukkan nama mod" 
            required
            disabled={loading}
          />

          <label>Tautan File *</label>
          <input 
            type="text" 
            id="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Masukkan link file (Google Drive, Mediafire, dll)" 
            required
            disabled={loading}
          />

          <label>Harga (Rp) *</label>
          <input 
            type="number" 
            id="harga"
            value={formData.harga}
            onChange={handleInputChange}
            placeholder="0"
            min="0"
            required
            disabled={loading}
            />

          <label>Deskripsi *</label>
          <textarea 
            id="deskripsi"
            rows="5" 
            value={formData.deskripsi}
            onChange={handleInputChange}
            placeholder="Tuliskan deskripsi mod kamu..."
            required
            disabled={loading}
          ></textarea>

          <div className="toko-upload-group">
            <label>Edit Gambar (Klik gambar untuk mengganti)</label>
            <div className="toko-image-preview-container">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="toko-image-preview-item">
                  <div 
                    className="toko-image-preview"
                    onClick={() => !loading && handleImageClick(index)}
                    style={{ opacity: loading ? 0.6 : 1 }}
                  >
                    {formData.gambar[index] ? (
                      <img 
                        src={formData.gambar[index]} 
                        alt={`Preview ${index + 1}`}
                        className="toko-preview-image"
                      />
                    ) : (
                      <div className="toko-no-image">+</div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    id={`file-input-${index}`}
                    onChange={(e) => handleFileChange(index, e)}
                    accept="image/*"
                    style={{ display: 'none' }}
                    disabled={loading}
                  />
                  <span className="toko-image-label">Gambar {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="toko-kategori">
            <label>Kategori Game *</label>
            <div className="toko-kategori-btns">
              {['ETS2', 'Bussid', 'Trainz'].map((kat) => (
                <button 
                  key={kat}
                  type="button" 
                  className={kategori === kat ? 'toko-active' : ''}
                  onClick={() => !loading && setKategori(kat)}
                  disabled={loading}
                >
                  {kat}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="toko-btn-upload"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </main>

      {/* Popup Success untuk Edit */}
      {showPopup && (
        <div className="toko-popup-overlay">
          <div className="toko-popup-content">
            <div className="toko-popup-icon">
              <div className="toko-popup-check">✓</div>
            </div>
            <div className="toko-popup-text">
              <h3>Mod Sukses Di Edit!</h3>
              <p>Perubahan telah berhasil disimpan</p>
            </div>
            <div className="toko-popup-actions">
              <button 
                className="toko-popup-btn toko-popup-btn-primary"
                onClick={closePopup}
              >
                Oke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMod;