// src/pages/toko/TransaksiToko.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/toko/Sidebar';
import { useToko } from '../../context/TokoContext';
import '../../styles/toko/toko-base.css';
import '../../styles/toko/transaksi_toko.css';

const TransaksiToko = () => {
  const { tokoData } = useToko();
  const [transaksi, setTransaksi] = useState([]);
  const [filterStatus, setFilterStatus] = useState('semua');
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    // Load transaksi dari localStorage
    const savedTransaksi = JSON.parse(localStorage.getItem('transaksiToko')) || [];
    
    // Jika belum ada data, buat sample data untuk demo
    if (savedTransaksi.length === 0) {
      const sampleTransaksi = [
        {
          id: 'TRX001',
          pembeli: {
            nama: 'Ahmad Rizki',
            email: 'ahmad.rizki@email.com'
          },
          mod: {
            nama: 'ETS2 Scania R620 Mod Pack',
            harga: 50000,
            kategori: 'ETS2',
            gambar: 'https://via.placeholder.com/100'
          },
          tanggal: new Date('2024-01-15').toISOString(),
          status: 'lunas',
          total: 50000,
          metodePembayaran: 'Transfer Bank'
        },
        {
          id: 'TRX002',
          pembeli: {
            nama: 'Sari Dewi',
            email: 'sari.dewi@email.com'
          },
          mod: {
            nama: 'Bussid Double Decker Bus',
            harga: 35000,
            kategori: 'Bussid',
            gambar: 'https://via.placeholder.com/100'
          },
          tanggal: new Date('2024-01-14').toISOString(),
          status: 'pending',
          total: 35000,
          metodePembayaran: 'E-Wallet'
        },
        {
          id: 'TRX003',
          pembeli: {
            nama: 'Budi Santoso',
            email: 'budi.santoso@email.com'
          },
          mod: {
            nama: 'Trainz Locomotive Pack',
            harga: 75000,
            kategori: 'Trainz',
            gambar: 'https://via.placeholder.com/100'
          },
          tanggal: new Date('2024-01-13').toISOString(),
          status: 'lunas',
          total: 75000,
          metodePembayaran: 'Transfer Bank'
        },
        {
          id: 'TRX004',
          pembeli: {
            nama: 'Maya Indah',
            email: 'maya.indah@email.com'
          },
          mod: {
            nama: 'ETS2 Volvo FH16 2023',
            harga: 45000,
            kategori: 'ETS2',
            gambar: 'https://via.placeholder.com/100'
          },
          tanggal: new Date('2024-01-12').toISOString(),
          status: 'dibatalkan',
          total: 45000,
          metodePembayaran: 'Transfer Bank'
        }
      ];
      localStorage.setItem('transaksiToko', JSON.stringify(sampleTransaksi));
      setTransaksi(sampleTransaksi);
    } else {
      setTransaksi(savedTransaksi);
    }
  }, []);

  const filteredTransaksi = filterStatus === 'semua' 
    ? transaksi 
    : transaksi.filter(t => t.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'lunas': return '#27ae60';
      case 'pending': return '#f39c12';
      case 'dibatalkan': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'lunas': return 'Lunas';
      case 'pending': return 'Pending';
      case 'dibatalkan': return 'Dibatalkan';
      default: return status;
    }
  };

  const handleDetailClick = (transaksi) => {
    setSelectedTransaksi(transaksi);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedTransaksi(null);
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="toko-container">
      <Sidebar />
      
      <main className="toko-main">
        <h1>Daftar Transaksi</h1>
        <p>Kelola semua transaksi pembelian mod dari toko Anda</p>

        {/* Filter Status */}
        <div className="toko-filter-transaksi">
          <label>Filter Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="toko-filter-select"
          >
            <option value="semua">Semua Status</option>
            <option value="lunas">Lunas</option>
            <option value="pending">Pending</option>
            <option value="dibatalkan">Dibatalkan</option>
          </select>
        </div>

        <div className="toko-transaksi-list">
          {filteredTransaksi.length === 0 ? (
            <div className="toko-no-transaksi">
              <p>Belum ada transaksi untuk toko Anda.</p>
            </div>
          ) : (
            filteredTransaksi.map((trx) => (
              <div key={trx.id} className="toko-transaksi-item">
                <div className="toko-transaksi-header">
                  <div className="toko-transaksi-info">
                    <h3>Transaksi #{trx.id}</h3>
                    <p>Pembeli: {trx.pembeli.nama}</p>
                    <p>Tanggal: {formatTanggal(trx.tanggal)}</p>
                  </div>
                  <div 
                    className="toko-transaksi-status"
                    style={{ backgroundColor: getStatusColor(trx.status) }}
                  >
                    {getStatusText(trx.status)}
                  </div>
                </div>

                <div className="toko-transaksi-content">
                  <div className="toko-transaksi-product">
                    <img 
                      src={trx.mod.gambar} 
                      alt={trx.mod.nama}
                      className="toko-product-image"
                    />
                    <div className="toko-product-info">
                      <h4>{trx.mod.nama}</h4>
                      <p>Kategori: {trx.mod.kategori}</p>
                      <p>Harga: {formatRupiah(trx.mod.harga)}</p>
                    </div>
                  </div>

                  <div className="toko-transaksi-meta">
                    <div className="toko-meta-item">
                      <span>Total:</span>
                      <span className="toko-total-amount">{formatRupiah(trx.total)}</span>
                    </div>
                    <div className="toko-meta-item">
                      <span>Metode Pembayaran:</span>
                      <span>{trx.metodePembayaran}</span>
                    </div>
                  </div>
                </div>

                <div className="toko-transaksi-actions">
                  <button 
                    className="toko-btn toko-btn-detail"
                    onClick={() => handleDetailClick(trx)}
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal Detail Transaksi */}
      {showDetail && selectedTransaksi && (
        <div className="toko-modal-overlay">
          <div className="toko-modal-content">
            <div className="toko-modal-header">
              <h2>Detail Transaksi #{selectedTransaksi.id}</h2>
              <button className="toko-modal-close" onClick={closeDetail}>
                ×
              </button>
            </div>

            <div className="toko-modal-body">
              <div className="toko-detail-section">
                <h3>Informasi Pembeli</h3>
                <div className="toko-detail-grid">
                  <div className="toko-detail-item">
                    <label>Nama Pembeli:</label>
                    <span>{selectedTransaksi.pembeli.nama}</span>
                  </div>
                  <div className="toko-detail-item">
                    <label>Email:</label>
                    <span>{selectedTransaksi.pembeli.email}</span>
                  </div>
                </div>
              </div>

              <div className="toko-detail-section">
                <h3>Informasi Produk</h3>
                <div className="toko-product-detail">
                  <img 
                    src={selectedTransaksi.mod.gambar} 
                    alt={selectedTransaksi.mod.nama}
                    className="toko-detail-product-image"
                  />
                  <div className="toko-detail-product-info">
                    <h4>{selectedTransaksi.mod.nama}</h4>
                    <p><strong>Kategori:</strong> {selectedTransaksi.mod.kategori}</p>
                    <p><strong>Harga:</strong> {formatRupiah(selectedTransaksi.mod.harga)}</p>
                  </div>
                </div>
              </div>

              <div className="toko-detail-section">
                <h3>Informasi Transaksi</h3>
                <div className="toko-detail-grid">
                  <div className="toko-detail-item">
                    <label>Tanggal Transaksi:</label>
                    <span>{formatTanggal(selectedTransaksi.tanggal)}</span>
                  </div>
                  <div className="toko-detail-item">
                    <label>Status:</label>
                    <span 
                      className="toko-detail-status"
                      style={{ color: getStatusColor(selectedTransaksi.status) }}
                    >
                      {getStatusText(selectedTransaksi.status)}
                    </span>
                  </div>
                  <div className="toko-detail-item">
                    <label>Metode Pembayaran:</label>
                    <span>{selectedTransaksi.metodePembayaran}</span>
                  </div>
                  <div className="toko-detail-item">
                    <label>Total Pembayaran:</label>
                    <span className="toko-detail-total">
                      {formatRupiah(selectedTransaksi.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="toko-modal-footer">
              <button 
                className="toko-btn toko-btn-primary"
                onClick={closeDetail}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransaksiToko;