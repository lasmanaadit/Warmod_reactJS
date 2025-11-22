// src/pages/toko/PenarikanSaldo.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/toko/Sidebar';
import { useToko } from '../../context/TokoContext';
import '../../styles/toko/toko-base.css';
import '../../styles/toko/penarikan_saldo.css';

const PenarikanSaldo = () => {
  const { tokoData } = useToko();
  const [formData, setFormData] = useState({
    nominal: '',
    bank: '',
    nomorRekening: '',
    atasNama: ''
  });
  const [saldoTersedia, setSaldoTersedia] = useState(0);
  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Load saldo tersedia dari localStorage
    const saldo = localStorage.getItem('saldoToko') || '10000';
    setSaldoTersedia(parseInt(saldo));
    
    
    // Load data rekening tersimpan jika ada
    const rekeningTersimpan = localStorage.getItem('dataRekening');
    if (rekeningTersimpan) {
      const data = JSON.parse(rekeningTersimpan);
      setFormData(prev => ({
        ...prev,
        bank: data.bank || '',
        nomorRekening: data.nomorRekening || '',
        atasNama: data.atasNama || ''
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;

    // Validasi form
    if (!formData.nominal || !formData.bank || !formData.nomorRekening || !formData.atasNama) {
      alert('Harap lengkapi semua field yang diperlukan');
      return;
    }

    const nominal = parseInt(formData.nominal.replace(/\./g, ''));
    
    if (isNaN(nominal) || nominal < 10000) {
      alert('Nominal penarikan minimal Rp 10.000');
      return;
    }

    if (nominal > saldoTersedia) {
      alert('Saldo tidak mencukupi untuk penarikan ini');
      return;
    }

    try {
      setLoading(true);

      // Simpan data rekening untuk penggunaan berikutnya
      localStorage.setItem('dataRekening', JSON.stringify({
        bank: formData.bank,
        nomorRekening: formData.nomorRekening,
        atasNama: formData.atasNama
      }));

      // Simpan riwayat penarikan
      const penarikanBaru = {
        id: Date.now().toString(),
        tanggal: new Date().toISOString(),
        nominal: nominal,
        bank: formData.bank,
        nomorRekening: formData.nomorRekening,
        atasNama: formData.atasNama,
        status: 'pending', // pending, processed, completed, rejected
        biayaAdmin: 2500 // Biaya admin tetap
      };

      const riwayatPenarikan = JSON.parse(localStorage.getItem('riwayatPenarikan') || '[]');
      riwayatPenarikan.unshift(penarikanBaru);
      localStorage.setItem('riwayatPenarikan', JSON.stringify(riwayatPenarikan));

      // Kurangi saldo tersedia (bukan total pendapatan)
      const saldoBaru = saldoTersedia - nominal;
      setSaldoTersedia(saldoBaru);
      localStorage.setItem('saldoToko', saldoBaru.toString());

      // Total pendapatan TIDAK berubah karena sudah termasuk semua pendapatan
      // Saldo tersedia yang berkurang

      // Tampilkan popup sukses
      setShowPopup(true);

      // Reset form nominal saja
      setFormData(prev => ({
        ...prev,
        nominal: ''
      }));

    } catch (error) {
      console.error('Error processing withdrawal:', error);
      alert('Terjadi error saat memproses penarikan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  const handleNominalChange = (e) => {
    let value = e.target.value.replace(/\./g, '');
    
    // Hanya angka yang diizinkan
    if (!/^\d*$/.test(value)) return;
    
    if (value === '') {
      setFormData(prev => ({ ...prev, nominal: '' }));
      return;
    }
    
    const numericValue = parseInt(value);
    if (isNaN(numericValue)) return;
    
    // Format dengan titik
    const formattedValue = numericValue.toLocaleString('id-ID');
    setFormData(prev => ({ ...prev, nominal: formattedValue }));
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="toko-container">
      <Sidebar />
      
      <main className="toko-main">
        <div className="toko-penarikan-header">
          <h1>Penarikan Saldo</h1>
          <p>Tarik saldo tersedia Anda ke rekening bank</p>
        </div>

        <div className="toko-penarikan-content">
          {/* Info Saldo */}
          <div className="toko-saldo-section">
            <div className="toko-saldo-card">
              <div className="toko-saldo-label">Saldo Tersedia</div>
              <div className="toko-saldo-amount">{formatRupiah(saldoTersedia)}</div>
            </div>
          </div>

          {/* Form Penarikan */}
          <div className="toko-penarikan-form-container">
            <form className="toko-penarikan-form" onSubmit={handleSubmit}>
              <div className="toko-form-group">
                <label htmlFor="nominal">Nominal Penarikan *</label>
                <div className="toko-input-with-prefix">
                  <span className="toko-input-prefix">Rp</span>
                  <input
                    type="text"
                    id="nominal"
                    name="nominal"
                    value={formData.nominal}
                    onChange={handleNominalChange}
                    placeholder="0"
                    required
                    disabled={loading}
                    className="toko-nominal-input"
                  />
                </div>
                <div className="toko-form-hint">
                  Minimal penarikan: {formatRupiah(10000)}
                </div>
              </div>

              <div className="toko-form-group">
                <label htmlFor="bank">Bank Tujuan *</label>
                <select
                  id="bank"
                  name="bank"
                  value={formData.bank}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="toko-bank-select"
                >
                  <option value="">Pilih Bank</option>
                  <option value="BCA">BCA</option>
                  <option value="BRI">BRI</option>
                  <option value="BNI">BNI</option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="BSI">BSI</option>
                  <option value="CIMB">CIMB</option>
                  <option value="Danamon">Danamon</option>
                  <option value="Permata">Permata</option>
                  <option value="OCBC">OCBC</option>
                  <option value="Maybank">Maybank</option>
                </select>
              </div>

              <div className="toko-form-group">
                <label htmlFor="nomorRekening">Nomor Rekening *</label>
                <input
                  type="text"
                  id="nomorRekening"
                  name="nomorRekening"
                  value={formData.nomorRekening}
                  onChange={handleInputChange}
                  placeholder="Masukkan nomor rekening"
                  required
                  disabled={loading}
                  className="toko-rekening-input"
                />
              </div>

              <div className="toko-form-group">
                <label htmlFor="atasNama">Atas Nama Rekening *</label>
                <input
                  type="text"
                  id="atasNama"
                  name="atasNama"
                  value={formData.atasNama}
                  onChange={handleInputChange}
                  placeholder="Nama pemilik rekening"
                  required
                  disabled={loading}
                  className="toko-nama-input"
                />
              </div>

              <div className="toko-penarikan-info">
                <h4>Informasi Penarikan:</h4>
                <div className="toko-info-item">
                  <span>Biaya Admin:</span>
                  <span>{formatRupiah(2500)}</span>
                </div>
                <div className="toko-info-item">
                  <span>Estimasi Waktu:</span>
                  <span>1-3 Hari Kerja</span>
                </div>
                <div className="toko-info-item">
                  <span>Saldo Setelah Penarikan:</span>
                  <span>
                    {formData.nominal ? 
                      formatRupiah(saldoTersedia - parseInt(formData.nominal.replace(/\./g, ''))) 
                      : formatRupiah(saldoTersedia)
                    }
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="toko-submit-btn"
                disabled={loading || saldoTersedia < 10000}
              >
                {loading ? 'Memproses...' : 'Ajukan Penarikan'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Popup Success */}
      {showPopup && (
        <div className="toko-popup-overlay">
          <div className="toko-popup-content">
            <div className="toko-popup-icon">
              <div className="toko-popup-check">✓</div>
            </div>
            <div className="toko-popup-text">
              <h3>Penarikan Berhasil Diajukan!</h3>
              <p>Permintaan penarikan Anda sedang diproses. Dana akan ditransfer dalam 1-3 hari kerja.</p>
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

export default PenarikanSaldo;