// src/pages/toko/TermsAndCondition.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/toko/toko-base.css';
import '../../styles/toko/terms_condition.css';

const TermsAndCondition = () => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgree = () => {
    if (isAgreed) {
      navigate('/toko/buat-toko');
    }
  };

  const handleDisagree = () => {
    navigate('/profile');
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  return (
    <div className="toko-terms-container">
      <div className="toko-terms-content">
        <div className="toko-terms-header">
          <h1>Syarat & Ketentuan Toko</h1>
          <div className="toko-terms-badge">
            <span>Penting</span>
          </div>
        </div>

        <div className="toko-terms-body">
          <div className="toko-terms-section">
            <h3>Ketentuan Umum</h3>
            <p>
              Dengan menyetujui syarat dan ketentuan ini, Anda setuju untuk mematuhi semua peraturan 
              yang berlaku di platform WARMOD. Toko Anda akan tunduk pada kebijakan yang ditetapkan 
              dan dapat dikenakan sanksi jika melanggar.
            </p>
          </div>

          <div className="toko-terms-section">
            <h3>Kewajiban Seller</h3>
            <ul>
              <li>Menyediakan mod yang original dan bebas dari malware</li>
              <li>Memberikan deskripsi yang akurat untuk setiap produk</li>
              <li>Merespon pesanan dan pertanyaan pembeli dengan cepat</li>
              <li>Memproses pesanan dalam waktu 24 jam</li>
              <li>Tidak melakukan penipuan atau praktik bisnis tidak jujur</li>
            </ul>
          </div>

          <div className="toko-terms-section">
            <h3>Hak Platform</h3>
            <ul>
              <li>Berhak meninjau dan menyetujui mod yang diupload</li>
              <li>Dapat membatasi atau menutup toko yang melanggar ketentuan</li>
              <li>Berhak mengambil komisi dari setiap transaksi yang berhasil</li>
              <li>Dapat mengubah syarat dan ketentuan dengan pemberitahuan</li>
            </ul>
          </div>

          <div className="toko-terms-section">
            <h3>Kebijakan Konten</h3>
            <p>
              Konten yang diupload tidak boleh mengandung materi ilegal, pornografi, atau konten 
              yang melanggar hak cipta. Platform berhak menghapus konten yang melanggar tanpa pemberitahuan.
            </p>
          </div>
        </div>

        <div className="toko-terms-footer">
          <div className="toko-terms-agreement">
            <label className="toko-terms-checkbox">
              <input 
                type="checkbox" 
                checked={isAgreed}
                onChange={handleCheckboxChange}
                required 
              />
              <span className="toko-checkmark"></span>
              Saya telah membaca dan menyetujui semua syarat dan ketentuan di atas
            </label>
          </div>

          <div className="toko-terms-actions">
            <button 
              className="toko-btn toko-btn-secondary"
              onClick={handleDisagree}
            >
              Tidak Setuju
            </button>
            <button 
              className={`toko-btn toko-btn-primary ${!isAgreed ? 'toko-btn-disabled' : ''}`}
              onClick={handleAgree}
              disabled={!isAgreed}
            >
              Setuju & Lanjutkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;