// src/pages/toko/DiskonToko.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/toko/Sidebar';
import { useToko } from '../../context/TokoContext';
import '../../styles/toko/toko-base.css';
import '../../styles/toko/diskon_toko.css';

const DiskonToko = () => {
  const { tokoData } = useToko();
  const [showFormDiskon, setShowFormDiskon] = useState(false);
  const [produkList, setProdukList] = useState([]);
  const [diskonList, setDiskonList] = useState([]);
  const [formData, setFormData] = useState({
    persentase: '',
    tanggalMulai: '',
    tanggalBerakhir: '',
    produkTerpilih: []
  });

  useEffect(() => {
    // Load produk dari localStorage
    const mods = JSON.parse(localStorage.getItem('mods')) || [];
    setProdukList(mods);
    
    // Load diskon dari localStorage
    const savedDiskon = JSON.parse(localStorage.getItem('diskonToko')) || [];
    setDiskonList(savedDiskon);
  }, []);

  // Filter produk yang belum didiskon
  const produkBelumDidiskon = produkList.filter(produk => 
    !diskonList.some(diskon => diskon.produkId === produk.id)
  );

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleCheckboxChange = (produkId) => {
    setFormData(prev => {
      const isSelected = prev.produkTerpilih.includes(produkId);
      if (isSelected) {
        return {
          ...prev,
          produkTerpilih: prev.produkTerpilih.filter(id => id !== produkId)
        };
      } else {
        return {
          ...prev,
          produkTerpilih: [...prev.produkTerpilih, produkId]
        };
      }
    });
  };

  const handleSelectAll = () => {
    if (formData.produkTerpilih.length === produkBelumDidiskon.length) {
      // Unselect all
      setFormData(prev => ({ ...prev, produkTerpilih: [] }));
    } else {
      // Select all
      setFormData(prev => ({
        ...prev,
        produkTerpilih: produkBelumDidiskon.map(produk => produk.id)
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitDiskon = (e) => {
    e.preventDefault();

    // Validasi form
    if (!formData.persentase || formData.persentase < 1 || formData.persentase > 99) {
      alert('Masukkan persentase diskon antara 1-99%');
      return;
    }

    if (!formData.tanggalMulai || !formData.tanggalBerakhir) {
      alert('Pilih tanggal mulai dan berakhir diskon');
      return;
    }

    if (new Date(formData.tanggalBerakhir) <= new Date(formData.tanggalMulai)) {
      alert('Tanggal berakhir harus setelah tanggal mulai');
      return;
    }

    if (formData.produkTerpilih.length === 0) {
      alert('Pilih minimal 1 produk untuk didiskon');
      return;
    }

    // Buat diskon untuk setiap produk terpilih
    const diskonBaru = formData.produkTerpilih.map(produkId => {
      const produk = produkList.find(p => p.id === produkId);
      const hargaAsli = produk.harga || 0;
      const persentase = parseInt(formData.persentase);
      const hargaDiskon = Math.round(hargaAsli * (1 - persentase / 100));

      return {
        id: `DISKON-${Date.now()}-${produkId}`,
        produkId: produkId,
        namaProduk: produk.nama,
        gambarProduk: produk.gambar && produk.gambar.length > 0 ? produk.gambar[0] : '',
        hargaAsli: hargaAsli,
        persentase: persentase,
        hargaDiskon: hargaDiskon,
        tanggalMulai: formData.tanggalMulai,
        tanggalBerakhir: formData.tanggalBerakhir,
        createdAt: new Date().toISOString()
      };
    });

    // Simpan ke localStorage
    const updatedDiskon = [...diskonList, ...diskonBaru];
    setDiskonList(updatedDiskon);
    localStorage.setItem('diskonToko', JSON.stringify(updatedDiskon));

    // Reset form
    setFormData({
      persentase: '',
      tanggalMulai: '',
      tanggalBerakhir: '',
      produkTerpilih: []
    });

    setShowFormDiskon(false);
    alert('Diskon berhasil dibuat!');
  };

  const handleHapusDiskon = (diskonId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus diskon ini?')) {
      const updatedDiskon = diskonList.filter(diskon => diskon.id !== diskonId);
      setDiskonList(updatedDiskon);
      localStorage.setItem('diskonToko', JSON.stringify(updatedDiskon));
      alert('Diskon berhasil dihapus!');
    }
  };

  const cekStatusDiskon = (tanggalBerakhir) => {
    const sekarang = new Date();
    const berakhir = new Date(tanggalBerakhir);
    return sekarang <= berakhir ? 'Aktif' : 'Kadaluarsa';
  };

  const getStatusColor = (status) => {
    return status === 'Aktif' ? '#27ae60' : '#e74c3c';
  };

  return (
    <div className="toko-container">
      <Sidebar />
      
      <main className="toko-main">
        <div className="toko-diskon-header">
          <div>
            <h1>Management Diskon</h1>
            <p>Kelola diskon untuk produk-produk Anda</p>
          </div>
          <button 
            className="toko-btn-buat-diskon"
            onClick={() => setShowFormDiskon(true)}
            disabled={produkBelumDidiskon.length === 0}
          >
            + Buat Diskon
          </button>
        </div>

        {/* Tabel Diskon */}
        <div className="toko-diskon-table-container">
          <h2>Daftar Produk Diskon</h2>
          
          {diskonList.length === 0 ? (
            <div className="toko-no-diskon">
              <p>Belum ada produk yang didiskon.</p>
              <button 
                className="toko-btn-buat-pertama"
                onClick={() => setShowFormDiskon(true)}
              >
                Buat Diskon Pertama
              </button>
            </div>
          ) : (
            <table className="toko-diskon-table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Harga Asli</th>
                  <th>Diskon</th>
                  <th>Harga Setelah Diskon</th>
                  <th>Periode</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {diskonList.map(diskon => {
                  const status = cekStatusDiskon(diskon.tanggalBerakhir);
                  return (
                    <tr key={diskon.id}>
                      <td>
                        <div className="toko-diskon-product">
                          <img 
                            src={diskon.gambarProduk || '/Img/default.jpg'} 
                            alt={diskon.namaProduk}
                            className="toko-diskon-product-image"
                          />
                          <span>{diskon.namaProduk}</span>
                        </div>
                      </td>
                      <td className="toko-harga-asli">
                        {formatRupiah(diskon.hargaAsli)}
                      </td>
                      <td className="toko-percentage-diskon">
                        {diskon.persentase}%
                      </td>
                      <td className="toko-harga-diskon">
                        {formatRupiah(diskon.hargaDiskon)}
                      </td>
                      <td className="toko-periode-diskon">
                        {formatTanggal(diskon.tanggalMulai)} - {formatTanggal(diskon.tanggalBerakhir)}
                      </td>
                      <td>
                        <span 
                          className="toko-status-diskon"
                          style={{ color: getStatusColor(status) }}
                        >
                          {status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="toko-btn-hapus-diskon"
                          onClick={() => handleHapusDiskon(diskon.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal Buat Diskon */}
      {showFormDiskon && (
        <div className="toko-modal-overlay">
          <div className="toko-modal-content">
            <div className="toko-modal-header">
              <h2>Buat Diskon Baru</h2>
              <button 
                className="toko-modal-close"
                onClick={() => setShowFormDiskon(false)}
              >
                ×
              </button>
            </div>

            <form className="toko-diskon-form" onSubmit={handleSubmitDiskon}>
              <div className="toko-form-group">
                <label>Persentase Diskon (%) *</label>
                <input
                  type="number"
                  name="persentase"
                  value={formData.persentase}
                  onChange={handleInputChange}
                  min="1"
                  max="99"
                  placeholder="Masukkan persentase diskon"
                  required
                  className="toko-persentase-input"
                />
                <small>Masukkan angka antara 1-99%</small>
              </div>

              <div className="toko-form-row">
                <div className="toko-form-group">
                  <label>Tanggal Mulai *</label>
                  <input
                    type="date"
                    name="tanggalMulai"
                    value={formData.tanggalMulai}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="toko-date-input"
                  />
                </div>

                <div className="toko-form-group">
                  <label>Tanggal Berakhir *</label>
                  <input
                    type="date"
                    name="tanggalBerakhir"
                    value={formData.tanggalBerakhir}
                    onChange={handleInputChange}
                    required
                    min={formData.tanggalMulai || new Date().toISOString().split('T')[0]}
                    className="toko-date-input"
                  />
                </div>
              </div>

              <div className="toko-form-group">
                <div className="toko-select-header">
                  <label>Pilih Produk untuk Didiskon *</label>
                  <button 
                    type="button"
                    className="toko-select-all-btn"
                    onClick={handleSelectAll}
                  >
                    {formData.produkTerpilih.length === produkBelumDidiskon.length ? 
                      'Batal Pilih Semua' : 'Pilih Semua'
                    }
                  </button>
                </div>
                
                <div className="toko-produk-list">
                  {produkBelumDidiskon.length === 0 ? (
                    <div className="toko-no-products">
                      <p>Semua produk sudah didiskon atau belum ada produk.</p>
                    </div>
                  ) : (
                    produkBelumDidiskon.map(produk => (
                      <label key={produk.id} className="toko-produk-item">
                        <input
                          type="checkbox"
                          checked={formData.produkTerpilih.includes(produk.id)}
                          onChange={() => handleCheckboxChange(produk.id)}
                          className="toko-produk-pcheckbox"
                        />
                        <img 
                          src={produk.gambar && produk.gambar.length > 0 ? produk.gambar[0] : '/Img/default.jpg'} 
                          alt={produk.nama}
                          className="toko-produk-thumb"
                        />
                        <div className="toko-produk-info">
                          <div className="toko-produk-name">{produk.nama}</div>
                          <div className="toko-produk-price">
                            {formatRupiah(produk.harga || 0)}
                          </div>
                        </div>
                      </label>
                    ))
                  )}
                </div>
                
                <small>
                  {formData.produkTerpilih.length} produk terpilih
                </small>
              </div>

              <div className="toko-modal-actions">
                <button
                  type="button"
                  className="toko-btn-cancel"
                  onClick={() => setShowFormDiskon(false)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="toko-btn-submit"
                  disabled={formData.produkTerpilih.length === 0}
                >
                  Simpan Diskon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiskonToko;