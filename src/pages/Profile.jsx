// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { FaUser, FaStore, FaExchangeAlt, FaSignOutAlt, FaEdit, FaSave, FaTimes, FaCheck, FaHistory, FaCopy, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useUserAuth } from '../context/UserAuthContext';
import { useToko } from '../context/TokoContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout: authLogout, updateUserProfile } = useUserAuth();
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
  const [activeTab, setActiveTab] = useState('profile');
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || 'Lasmanaadit',
        email: user.email || 'lasmanaadit@example.com'
      });
    }
    loadPurchaseHistory();
  }, [user]);

  const loadPurchaseHistory = () => {
    const savedOrders = localStorage.getItem('warmodOrderHistory');
    if (savedOrders) {
      const orders = JSON.parse(savedOrders);
      
      const allPurchases = [];
      
      orders.forEach(order => {
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach(item => {
            allPurchases.push({
              ...item,
              orderNumber: order.orderNumber,
              orderDate: order.timestamp || order.paidAt,
              deliveryEmail: order.deliveryEmail,
              paymentMethod: order.paymentMethod,
              status: order.status,
              purchaseId: `${order.orderNumber}-${item.id}`,
              totalPrice: item.price
            });
          });
        }
      });
      
      const userPurchases = allPurchases.filter(purchase => 
        purchase.deliveryEmail === user?.email
      );
      
      setPurchaseHistory(userPurchases);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchaseHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(purchaseHistory.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

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
    updateTokoStatus(null, null);
    
    showNotification('Logout berhasil! Mengalihkan...');
    
    setTimeout(() => {
      navigate('/before-login');
    }, 1500);
    
    closeLogoutPopup();
  };

  const showStorePopupHandler = () => {
    if (tokoStatus === 'seller') {
      navigate('/toko/dashboard');
    } else {
      setShowStorePopup(true);
    }
  };

  const closeStorePopup = () => {
    setShowStorePopup(false);
  };

  const createStore = () => {
    closeStorePopup();
    navigate('/toko/terms');
  };

  const showNotification = (message) => {
    alert(message);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Link download berhasil disalin!');
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'paid':
        return { class: 'status-paid', text: 'Berhasil' };
      case 'pending':
        return { class: 'status-pending', text: 'Pending' };
      case 'expired':
        return { class: 'status-expired', text: 'Expired' };
      default:
        return { class: 'status-pending', text: status };
    }
  };

  const showPreviewModal = (purchase) => {
    setSelectedPurchase(purchase);
    setShowPreview(true);
  };

  const closePreviewModal = () => {
    setShowPreview(false);
    setSelectedPurchase(null);
  };

  if (!user) {
    return (
      <section className="profile">
        <div className="container">
          <div className="app-loading">Loading...</div>
        </div>
      </section>
    );
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
                  <span className="stat-description">
                    Jelajahi dan beli mod game terbaik untuk pengalaman gaming yang lebih seru!
                  </span>
                </div>
              </div>
            </div>
            
            <div className="profile-menu">
              <a 
                href="#" 
                className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <FaUser/>
                <span>Profile Saya</span>
              </a>
              <a 
                href="#" 
                className={`menu-item ${activeTab === 'riwayat' ? 'active' : ''}`}
                onClick={() => setActiveTab('riwayat')}
              >
                <FaHistory/>
                <span>Transaksi Saya</span>
                {purchaseHistory.length > 0 && (
                  <span className="badge">{purchaseHistory.length}</span>
                )}
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
            {activeTab === 'profile' ? (
              <>
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
                        <button 
                          className="edit-btn" 
                          onClick={() => enableEdit('name')}
                          type="button"
                        >
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
                        <button 
                          className="edit-btn" 
                          onClick={() => enableEdit('email')}
                          type="button"
                        >
                          <FaEdit/>
                        </button>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="form-actions">
                      <button className="save-btn" onClick={saveProfile} type="button">
                        <FaSave/>
                        Simpan Perubahan
                      </button>
                      <button className="cancel-btn" onClick={cancelEdit} type="button">
                        <FaTimes/>
                        Batal
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
              <div className="profile-header">
                <h1>Riwayat Pembelian Mod</h1>
                <p>Total {purchaseHistory.length} mod telah dibeli</p>
              </div>

              <div className="profile-purchase-history">
                {purchaseHistory.length === 0 ? (
                  <div className="profile-empty-purchase">
                    <div className="profile-empty-message">
                      <FaHistory/>
                      <h2>Belum ada pembelian</h2>
                      <p>Belum ada riwayat pembelian mod</p>
                      <a href="/products" className="cta-button">Belanja Sekarang</a>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="profile-table-container">
                      <table className="profile-purchase-table">
                        <thead>
                          <tr>
                            <th>Mod</th>
                            <th>Kategori</th>
                            <th>Tanggal</th>
                            <th>Harga</th>
                            <th>Status</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((purchase, index) => {
                            const status = getStatusBadge(purchase.status);
                            return (
                              <tr key={purchase.purchaseId || index}>
                                <td className="profile-product-cell">
                                  <div className="profile-product-info">
                                    <img src={purchase.image} alt={purchase.title} />
                                    <div>
                                      <div className="profile-product-title">{purchase.title}</div>
                                      <div className="profile-product-seller">{purchase.seller}</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="profile-category-tag">{purchase.category}</span>
                                </td>
                                <td>{formatDate(purchase.orderDate)}</td>
                                <td className="profile-price-cell">Rp {purchase.totalPrice?.toLocaleString() || purchase.price?.toLocaleString()}</td>
                                <td>
                                  <span className={`profile-status-tag ${status.class}`}>
                                    {status.text}
                                  </span>
                                </td>
                                <td>
                                  <button 
                                    className="profile-preview-btn"
                                    onClick={() => showPreviewModal(purchase)}
                                  >
                                    <FaEye/> Preview
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="profile-table-pagination">
                        <button 
                          className="profile-page-btn prev" 
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <FaChevronLeft/> Prev
                        </button>
                        
                        {getPageNumbers().map(pageNumber => (
                          <button
                            key={pageNumber}
                            className={`profile-page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                            onClick={() => paginate(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        ))}
                        
                        <button 
                          className="profile-page-btn next" 
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next <FaChevronRight/>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    {/* Preview Modal */}
    {showPreview && selectedPurchase && (
      <div className="popup-overlay">
        <div className="popup-content profile-preview-modal">
          <div className="popup-header">
            <h2>Detail Pembelian</h2>
            <button className="popup-close" onClick={closePreviewModal} type="button">
              <FaTimes/>
            </button>
          </div>
          <div className="popup-bodyhistory">
            <div className="profile-preview-content">
              <div className="profile-preview-image">
                <img src={selectedPurchase.image} alt={selectedPurchase.title} />
              </div>
              <div className="profile-preview-details">
                <h3>{selectedPurchase.title}</h3>
                <div className="profile-detail-grid">
                  <div className="profile-detail-item">
                    <label>ID Pembelian:</label>
                    <span>{selectedPurchase.purchaseId}</span>
                  </div>
                  <div className="profile-detail-item">
                    <label>Kategori:</label>
                    <span className="profile-category-badge">{selectedPurchase.category}</span>
                  </div>
                  <div className="profile-detail-item">
                    <label>Seller:</label>
                    <span>{selectedPurchase.seller}</span>
                  </div>
                  <div className="profile-detail-item">
                    <label>Tanggal Pembelian:</label>
                    <span>{formatDateTime(selectedPurchase.orderDate)}</span>
                  </div>
                  <div className="profile-detail-item">
                    <label>Email Pengiriman:</label>
                    <span className="profile-email-info">{selectedPurchase.deliveryEmail}</span>
                  </div>
                  <div className="profile-detail-item">
                    <label>Metode Pembayaran:</label>
                    <span className="profile-payment-method">
                      {selectedPurchase.paymentMethod === 'qris' ? 'QRIS' : selectedPurchase.paymentMethod}
                    </span>
                  </div>
                  <div className="profile-detail-item">
                    <label>Status:</label>
                    <span className={`profile-status-badge ${getStatusBadge(selectedPurchase.status).class}`}>
                      {getStatusBadge(selectedPurchase.status).text}
                    </span>
                  </div>
                  <div className="profile-detail-item">
                    <label>Harga:</label>
                    <span className="profile-price-amount">Rp {selectedPurchase.totalPrice?.toLocaleString() || selectedPurchase.price?.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="profile-download-section">
                  <label>Link Download:</label>
                  <div className="profile-download-link">
                    <input 
                      type="text" 
                      value={`https://warmod.com/download/${selectedPurchase.id}`}
                      readOnly 
                      className="profile-link-input"
                    />
                    <button 
                      className="profile-copy-btn"
                      onClick={() => copyToClipboard(`https://warmod.com/download/${selectedPurchase.id}`)}
                    >
                      <FaCopy/> Salin
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

      {/* Store Popup */}
      {showStorePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2><strong>Anda belum mempunyai toko mods</strong></h2>
              <button className="popup-close" onClick={closeStorePopup} type="button">
                <FaTimes/>
              </button>
            </div>
            <div className="popup-body">
              <p>Apakah anda akan membuat toko?</p>
            </div>
            <div className="popup-actions">
              <button className="popup-btn confirm-btn" onClick={createStore} type="button">
                <FaCheck/>
                Iya
              </button>
              <button className="popup-btn cancel-btn" onClick={closeStorePopup} type="button">
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
              <button className="popup-close" onClick={closeLogoutPopup} type="button">
                <FaTimes/>
              </button>
            </div>
            <div className="popup-body">
              <p>Apakah Anda yakin ingin logout?</p>
            </div>
            <div className="popup-actions">
              <button className="popup-btn confirm-btn" onClick={performLogout} type="button">
                <FaCheck/>
                Ya, Logout
              </button>
              <button className="popup-btn cancel-btn" onClick={closeLogoutPopup} type="button">
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