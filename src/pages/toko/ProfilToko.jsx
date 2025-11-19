// src/pages/toko/ProfilToko.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/toko/Sidebar';
import { useToko } from '../../context/TokoContext';
import { useAuth } from '../../context/AuthContext';
import '../../styles/toko/toko-base.css';
import '../../styles/toko/profil_toko.css';

const ProfilToko = () => {
  const { tokoData, buatToko } = useToko();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    namaPemilik: '',
    namaToko: '',
    deskripsi: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [fotoProfil, setFotoProfil] = useState('https://via.placeholder.com/120');

  useEffect(() => {
    // Load data from localStorage dan user context
    const savedData = {
      namaPemilik: localStorage.getItem('namaPemilik') || user?.name || 'Lasmanaadit',
      namaToko: localStorage.getItem('namaToko') || 'Nama Toko',
      email: localStorage.getItem('email') || user?.email || 'lasmanaadit@gmail.com',
      deskripsi: localStorage.getItem('deskripsi') || 'Deskripsi toko...'
    };
    
    setFormData(savedData);
    
    const savedFoto = localStorage.getItem('fotoProfil');
    if (savedFoto) {
      setFotoProfil(savedFoto);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFotoProfil(reader.result);
        localStorage.setItem('fotoProfil', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save to localStorage
    Object.keys(formData).forEach(key => {
      localStorage.setItem(key, formData[key]);
    });
    
    // Update toko data in context
    buatToko({
      ...formData,
      fotoProfil: fotoProfil
    });
    
    setIsEditing(false);
    alert('✅ Profil berhasil disimpan!');
  };

  return (
    <div className="toko-container">
      <Sidebar />
      
      <main className="toko-main">
        <h1>Profil Toko</h1>

        <div className="toko-profile-container">
          <div className="toko-profile-photo">
            <label htmlFor="uploadFoto">
              <img 
                id="fotoProfil" 
                src={fotoProfil} 
                alt="Foto Profil" 
                title="Klik untuk ganti foto" 
              />
            </label>
            <input 
              type="file" 
              id="uploadFoto" 
              accept="image/*" 
              style={{display: 'none'}} 
              onChange={handleFotoChange}
            />
            <button 
              className="toko-edit-btn" 
              onClick={() => setIsEditing(true)}
              style={{ display: isEditing ? 'none' : 'inline-block' }}
            >
              Edit
            </button>
          </div>

          <div className="toko-profile-form">
            <label>Nama Pemilik</label>
            <input 
              type="text" 
              id="namaPemilik" 
              value={formData.namaPemilik}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />

            <label>Nama Toko</label>
            <input 
              type="text" 
              id="namaToko" 
              value={formData.namaToko}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />

            <label>Deskripsi</label>
            <textarea 
              id="deskripsi" 
              value={formData.deskripsi}
              onChange={handleInputChange}
              readOnly={!isEditing}
            ></textarea>

            <label>Email</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />

            {isEditing && (
              <button className="toko-save-btn" onClick={handleSave}>
                Simpan Perubahan
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilToko;