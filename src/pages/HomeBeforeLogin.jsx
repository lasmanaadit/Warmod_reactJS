// src/pages/HomeBeforeLogin.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaDownload, FaShieldAlt, FaBolt, FaHeadset, FaSyncAlt, FaTimes, FaSignInAlt } from 'react-icons/fa';

const HomeBeforeLogin = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      title: "UD Quester 1.56",
      category: "ETS2",
      price: 100000,
      image: "ets2_20240328_230125_00.png",
      downloads: 192
    },
    // ... produk lainnya
  ];

  const showLoginRequired = () => {
    setShowLoginPopup(true);
  };

  const closeLoginRequired = () => {
    setShowLoginPopup(false);
  };

  const goToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>WARMOD - Premium Game Addons</h1>
          <p>Dapatkan addon terbaik untuk game kesayangan Anda dengan harga terjangkau dan kualitas premium.</p>
          <div className="hero-actions">
            <Link to="/login" className="cta-button primary">Login untuk Belanja</Link>
            <Link to="/login" className="cta-button secondary">Lihat Produk</Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container">
        <h2 className="section-title">Addons Terpopuler</h2>
        
        {/* Category Filter */}
        <div className="category-filter">
          <button className="filter-btn active" data-category="all">Semua</button>
          <button className="filter-btn" data-category="ETS2">ETS2</button>
          <button className="filter-btn" data-category="BUSSID">BUSSID</button>
          <button className="filter-btn" data-category="TRAINZ">TRAINZ</button>
        </div>
        
        {/* Products Grid */}
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card" data-category={product.category}>
              <div className="product-image">
                <img src={product.image} alt={product.title} />
                <div className="category-label">{product.category}</div>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <div className="product-price">Rp.{product.price.toLocaleString()}</div>
                <div className="product-stats">
                  <div className="stat"><FaDownload/> {product.downloads} Unduhan</div>
                </div>
                <div className="buy-button" onClick={showLoginRequired}>
                  LOGIN UNTUK MEMBELI
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/login" className="cta-button">LIHAT SEMUA PRODUK</Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Mengapa Memilih WARMOD?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i><FaShieldAlt/></i>
              <h3>Aman & Terpercaya</h3>
              <p>Transaksi aman dengan sistem pembayaran terpercaya</p>
            </div>
            <div className="feature-card">
              <i><FaBolt/></i>
              <h3>Instant Delivery</h3>
              <p>Mod dikirim langsung ke email setelah pembayaran</p>
            </div>
            <div className="feature-card">
              <i><FaHeadset/></i>
              <h3>Support 24/7</h3>
              <p>Tim support siap membantu kapan saja</p>
            </div>
            <div className="feature-card">
              <i><FaSyncAlt/></i>
              <h3>Update Gratis</h3>
              <p>Dapatkan update mod secara gratis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Login CTA Section */}
      <section className="login-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Upgrade Your Gaming Experience?</h2>
            <p>Login sekarang dan dapatkan akses ke ratusan mod premium</p>
            <div className="cta-actions">
              <Link to="/login" className="cta-button large">Login Sekarang</Link>
              <Link to="/register" className="cta-button secondary large">Daftar Akun Baru</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Login Required Popup */}
      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2><strong>Login Diperlukan</strong></h2>
              <button className="popup-close" onClick={closeLoginRequired}>
                <i><FaTimes/></i>
              </button>
            </div>
            <div className="popup-body">
              <p>Anda perlu login untuk dapat membeli produk. Silakan login atau daftar akun baru.</p>
            </div>
            <div className="popup-actions">
              <button className="popup-btn confirm-btn" onClick={goToLogin}>
                <i><FaSignInAlt/></i>
                Login Sekarang
              </button>
              <button className="popup-btn cancel-btn" onClick={closeLoginRequired}>
                <i><FaTimes/></i>
                Nanti Saja
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeBeforeLogin;