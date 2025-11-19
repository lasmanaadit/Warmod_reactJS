// src/pages/Profile.jsx (Fully Updated)
import React, { useState, useEffect } from 'react';
import { FaUser, FaStore, FaExchangeAlt, FaSignOutAlt, FaEdit, FaSave, FaTimes, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToko } from '../context/TokoContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout: authLogout, updateUserProfile } = useAuth();
  const { tokoStatus, updateTokoStatus } = useToko();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });
  const [originalValues, setOriginalValues] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showStorePopup, setShowStorePopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || 'Lasmanaadit',
        email: user.email || 'lasmanaadit@example.com'
      });
    }
  }, [user]);

  const enableEdit = (field) => {
    setOriginalValues({ ...profileData });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setProfileData(originalValues);
    setIsEditing(false);
    setOriginalValues({});
  };

  const saveProfile = () => {
    // Update melalui AuthContext
    updateUserProfile(profileData);
    setIsEditing(false);
    setOriginalValues({});
    showNotification('Profile berhasil disimpan!');
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showLogoutConfirmation = () => {
    setShowLogoutPopup(true);
  };

  const closeLogoutPopup = () => {
    setShowLogoutPopup(false);
  };

  const performLogout = () => {
    authLogout();
    updateTokoStatus(null, null); // Reset toko status on logout
    
    showNotification('Logout berhasil! Mengalihkan...');
    
    setTimeout(() => {
      navigate('/before-login');
    }, 1500);
    
    closeLogoutPopup();
  };

  const showStorePopupHandler = () => {
    if (tokoStatus === 'seller') {
      // Jika sudah punya toko, langsung ke dashboard
      navigate('/toko/dashboard');
    } else {
      // Jika belum punya toko, tampilkan popup
      setShowStorePopup(true);
    }
  };

  const closeStorePopup = () => {
    setShowStorePopup(false);
  };

  const createStore = () => {
    closeStorePopup();
    // Arahkan ke terms and condition
    navigate('/toko/terms');
  };

  const showNotification = (message) => {
    // Implementasi notifikasi (bisa menggunakan toast library)
    alert(message); // Temporary
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section className="profile">
      <div className="container">
        <div className="profile-content">
          {/* Profile Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-card">
              <h2 className="profile-name">{profileData.name}</h2>
              <p className="profile-email">{profileData.email}</p>
              <div className="profile-stats">
                <div className="stat-item">

                </div>
                <div className="stat-item">
                  <span className="stat-description">
                    Jelajahi dan beli mod game terbaik untuk pengalaman gaming yang lebih seru!
                  </span>
                </div>
              </div>
            </div>
            
            <div className="profile-menu">
              <a href="#" className="menu-item active">
                <FaUser/>
                <span>Profile Saya</span>
              </a>
              <a href="#" className="menu-item" onClick={showStorePopupHandler}>
                <FaStore/>
                <span>Toko Saya</span>
                {tokoStatus === 'seller' && <span className="badge">✓</span>}
              </a>
              <a href="/payment" className="menu-item">
                <FaExchangeAlt/>
                <span>Transaksi Berlangsung</span>
              </a>
              <a href="#" className="menu-item logout-item" onClick={showLogoutConfirmation}>
                <FaSignOutAlt/>
                <span>Logout</span>
              </a>
            </div>
          </div>

          {/* Profile Main Content */}
          <div className="profile-main">
            <div className="profile-header">
              <h1>Profile Saya</h1>
              <p>Kelola informasi profile Anda</p>
            </div>

            <div className="profile-form">
              <div className="form-section">
                <h3>Informasi Pribadi</h3>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <div className="input-with-edit">
                    <input 
                      type="text" 
                      id="username" 
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      readOnly={!isEditing}
                    />
                    <button className="edit-btn" onClick={() => enableEdit('name')}>
                      <FaEdit/>
                    </button>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-with-edit">
                    <input 
                      type="email" 
                      id="email" 
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      readOnly={!isEditing}
                    />
                    <button className="edit-btn" onClick={() => enableEdit('email')}>
                      <FaEdit/>
                    </button>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button className="save-btn" onClick={saveProfile}>
                    <FaSave/>
                    Simpan Perubahan
                  </button>
                  <button className="cancel-btn" onClick={cancelEdit}>
                    <FaTimes/>
                    Batal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Store Popup */}
      {showStorePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2><strong>Anda belum mempunyai toko mods</strong></h2>
              <button className="popup-close" onClick={closeStorePopup}>
                <FaTimes/>
              </button>
            </div>
            <div className="popup-body">
              <p>Apakah anda akan membuat toko?</p>
            </div>
            <div className="popup-actions">
              <button className="popup-btn confirm-btn" onClick={createStore}>
                <FaCheck/>
                Iya
              </button>
              <button className="popup-btn cancel-btn" onClick={closeStorePopup}>
                <FaTimes/>
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Popup */}
      {showLogoutPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2><strong>Konfirmasi Logout</strong></h2>
              <button className="popup-close" onClick={closeLogoutPopup}>
                <FaTimes/>
              </button>
            </div>
            <div className="popup-body">
              <p>Apakah Anda yakin ingin logout?</p>
            </div>
            <div className="popup-actions">
              <button className="popup-btn confirm-btn" onClick={performLogout}>
                <FaCheck/>
                Ya, Logout
              </button>
              <button className="popup-btn cancel-btn" onClick={closeLogoutPopup}>
                <FaTimes/>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;