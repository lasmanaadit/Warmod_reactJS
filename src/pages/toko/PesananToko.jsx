// src/pages/toko/PesananToko.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/toko/Sidebar';
import { useToko } from '../../context/TokoContext';
import '../../styles/toko/toko-base.css';
import '../../styles/toko/pesanan_toko.css';

const PesananToko = () => {
  const { tokoData } = useToko();
  const [pesanan, setPesanan] = useState([]);
  const [filterStatus, setFilterStatus] = useState('semua');

  useEffect(() => {
    // Load pesanan dari localStorage
    const savedPesanan = JSON.parse(localStorage.getItem('pesanan')) || [];
    
    // Filter pesanan yang hanya untuk toko ini
    const pesananToko = savedPesanan.filter(p => 
      p.toko === tokoData?.namaToko
    );
    
    setPesanan(pesananToko);
  }, [tokoData]);

  const updateStatusPesanan = (id, statusBaru) => {
    const semuaPesanan = JSON.parse(localStorage.getItem('pesanan')) || [];
    const updatedPesanan = semuaPesanan.map(p => 
      p.id === id ? { ...p, status: statusBaru } : p
    );
    
    localStorage.setItem('pesanan', JSON.stringify(updatedPesanan));
    
    // Update state
    const pesananToko = updatedPesanan.filter(p => 
      p.toko === tokoData?.namaToko
    );
    setPesanan(pesananToko);
  };

  const filteredPesanan = filterStatus === 'semua' 
    ? pesanan 
    : pesanan.filter(p => p.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'menunggu': return '#f39c12';
      case 'diproses': return '#3498db';
      case 'dikirim': return '#9b59b6';
      case 'selesai': return '#27ae60';
      case 'dibatalkan': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="toko-container">
      <Sidebar />
      
      <main className="toko-main">
        <h1>Pesanan Toko</h1>

        {/* Filter Status */}
        <div className="toko-filter-pesanan">
          <label>Filter Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="toko-filter-select"
          >
            <option value="semua">Semua</option>
            <option value="menunggu">Menunggu</option>
            <option value="diproses">Diproses</option>
            <option value="dikirim">Dikirim</option>
            <option value="selesai">Selesai</option>
            <option value="dibatalkan">Dibatalkan</option>
          </select>
        </div>

        <div className="toko-pesanan-list">
          {filteredPesanan.length === 0 ? (
            <div className="toko-no-pesanan">
              <p>Belum ada pesanan untuk toko Anda.</p>
            </div>
          ) : (
            filteredPesanan.map((order) => (
              <div key={order.id} className="toko-pesanan-item">
                <div className="toko-pesanan-header">
                  <div className="toko-pesanan-info">
                    <h3>Order #{order.id}</h3>
                    <p>Pembeli: {order.pembeli}</p>
                    <p>Tanggal: {new Date(order.tanggal).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div 
                    className="toko-pesanan-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status.toUpperCase()}
                  </div>
                </div>

                <div className="toko-pesanan-products">
                  {order.produk.map((produk, index) => (
                    <div key={index} className="toko-pesanan-product">
                      <img 
                        src={produk.gambar || '/Img/default.jpg'} 
                        alt={produk.nama}
                        className="toko-product-image"
                      />
                      <div className="toko-product-details">
                        <h4>{produk.nama}</h4>
                        <p>Harga: Rp {produk.harga?.toLocaleString('id-ID')}</p>
                        <p>Kategori: {produk.kategori}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="toko-pesanan-total">
                  <strong>Total: Rp {order.total?.toLocaleString('id-ID')}</strong>
                </div>

                <div className="toko-pesanan-actions">
                  {order.status === 'menunggu' && (
                    <>
                      <button 
                        className="toko-btn toko-btn-proses"
                        onClick={() => updateStatusPesanan(order.id, 'diproses')}
                      >
                        Proses Pesanan
                      </button>
                      <button 
                        className="toko-btn toko-btn-batal"
                        onClick={() => updateStatusPesanan(order.id, 'dibatalkan')}
                      >
                        Batalkan
                      </button>
                    </>
                  )}
                  
                  {order.status === 'diproses' && (
                    <button 
                      className="toko-btn toko-btn-kirim"
                      onClick={() => updateStatusPesanan(order.id, 'dikirim')}
                    >
                      Tandai Dikirim
                    </button>
                  )}
                  
                  {order.status === 'dikirim' && (
                    <button 
                      className="toko-btn toko-btn-selesai"
                      onClick={() => updateStatusPesanan(order.id, 'selesai')}
                    >
                      Tandai Selesai
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default PesananToko;