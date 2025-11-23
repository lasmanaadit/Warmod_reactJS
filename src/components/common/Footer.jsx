// D:\Tugas\Tugas Matkul\Capstone\Framework Warmod\warmod_react\src\components\common\Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

const Footer = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:support@warmod.com';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/6281234567890', '_blank');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Contact</h3>
            <ul className="footer-links">
              <li>
                <button onClick={handleEmailClick} className="footer-link">
                  Email: support@warmod.com
                </button>
              </li>
              <li>
                <button onClick={handleWhatsAppClick} className="footer-link">
                  WhatsApp: +62 812-3456-7890
                </button>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Syarat & Ketentuan</h3>
            <ul className="footer-links">
              <li>
                <Link to="/privacy-policy" className="footer-link">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="footer-link">
                  Syarat Layanan
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Pertanyaan Umum</h3>
            <ul className="footer-links">
              <li>
                <Link to="/how-to-buy" className="footer-link">
                  Cara Pembelian
                </Link>
              </li>
              <li>
                <Link to="/how-to-install" className="footer-link">
                  Cara Install Addon
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>WARMOD</h3>
            <ul className="footer-links">
              <li>
                <Link to="/about-us" className="footer-link">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          © 2025 WARMOD. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;