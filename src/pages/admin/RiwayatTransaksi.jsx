import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import '../../styles/admin/RiwayatTransaksi.css';

const RiwayatTransaksi = () => {
  const { transactions } = useAdmin();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter transactions berdasarkan status dan pencarian
  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = filterStatus === 'all' || transaction.transaksi.status === filterStatus;
    const matchesSearch = 
      transaction.pembeli.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.pembeli.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.penjual.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.penjual.toko.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.produk.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedTransaction(null);
  };

  // Hitung statistik
  const totalTransactions = transactions.length;
  const successTransactions = transactions.filter(t => t.transaksi.status === 'done').length;
  const failedTransactions = transactions.filter(t => t.transaksi.status === 'failed').length;
  const pendingTransactions = transactions.filter(t => t.transaksi.status === 'pending').length;

  // Format tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  return (
    <AdminLayout activePage="transactions">
      <h1>Riwayat Transaksi</h1>

      {/* STATISTICS */}
      <div className="transaction-summary">
        <div className="summary-card summary-semua">
          <div className="summary-value">{totalTransactions}</div>
          <div className="summary-label">Total Transaksi</div>
        </div>
        <div className="summary-card summary-success">
          <div className="summary-value">{successTransactions}</div>
          <div className="summary-label">Berhasil</div>
        </div>
        <div className="summary-card summary-failed">
          <div className="summary-value">{failedTransactions}</div>
          <div className="summary-label">Gagal</div>
        </div>
        <div className="summary-card summary-pending">
          <div className="summary-value">{pendingTransactions}</div>
          <div className="summary-label">Pending</div>
        </div>
      </div>

      {/* FILTERS AND SEARCH */}
      <div className="transaction-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Cari transaksi..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select 
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="done">Berhasil</option>
            <option value="failed">Gagal</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="admin-table-box">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>ID Transaksi</th>
              <th style={{ width: '150px' }}>Pembeli</th>
              <th style={{ width: '150px' }}>Penjual/Toko</th>
              <th style={{ width: '200px' }}>Produk</th>
              <th style={{ width: '120px' }}>Harga</th>
              <th style={{ width: '150px' }}>Tanggal</th>
              <th style={{ width: '100px' }}>Status</th>
              <th style={{ width: '100px' }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  <div className="transaction-id">
                    {transaction.transactionId}
                  </div>
                </td>
                <td>
                  <div className="customer-info">
                    <div className="customer-name">{transaction.pembeli.nama}</div>
                    <div className="customer-email">{transaction.pembeli.email}</div>
                  </div>
                </td>
                <td>
                  <div className="store-info">
                    <div className="store-name">{transaction.penjual.toko}</div>
                    <div className="customer-email">{transaction.penjual.email}</div>
                  </div>
                </td>
                <td>
                  <div className="transaction-product">
                    {transaction.produk.nama}
                  </div>
                  <div className="transaction-category">
                    {transaction.produk.kategori}
                  </div>
                </td>
                <td>
                  <div className="transaction-amount">
                    {transaction.produk.harga}
                  </div>
                </td>
                <td>
                  <div className="transaction-date">
                    {formatDate(transaction.transaksi.tanggal)}
                  </div>
                </td>
                <td>
                  <span className={
                    transaction.transaksi.status === 'done' ? 'status-done' :
                    transaction.transaksi.status === 'failed' ? 'status-failed' : 'status-pending'
                  }>
                    {transaction.transaksi.status === 'done' ? 'Berhasil' :
                     transaction.transaksi.status === 'failed' ? 'Gagal' : 'Pending'}
                  </span>
                </td>
                <td>
                  <button 
                    className="admin-btn preview-btn"
                    onClick={() => handleViewDetail(transaction)}
                  >
                    <FontAwesomeIcon icon={faEye} /> Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <FontAwesomeIcon icon={faFilter} size="2x" style={{ marginBottom: '10px' }} />
            <div>Tidak ada transaksi yang sesuai dengan filter</div>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <div className="pagination-info">
          Menampilkan 1 - {filteredTransactions.length} dari {transactions.length} transaksi
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn" disabled>Sebelumnya</button>
          <div className="pagination-numbers">
            <span className="page-number active">1</span>
          </div>
          <button className="pagination-btn">Selanjutnya</button>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {showDetail && selectedTransaction && (
        <div className="preview-modal">
          <div className="preview-content">
            <div className="preview-header">
              <h3>Detail Transaksi - {selectedTransaction.transactionId}</h3>
              <button className="close-btn" onClick={closeDetail}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="preview-grid">
              {/* Kolom Kiri - Informasi Pembeli & Penjual */}
              <div className="preview-details">
                <div className="detail-group">
                  <h4>Informasi Pembeli</h4>
                  <p><strong>Nama:</strong> {selectedTransaction.pembeli.nama}</p>
                  <p><strong>Email:</strong> {selectedTransaction.pembeli.email}</p>
                  <p><strong>Telepon:</strong> {selectedTransaction.pembeli.telepon}</p>
                </div>

                <div className="detail-group">
                  <h4>Informasi Penjual</h4>
                  <p><strong>Nama Penjual:</strong> {selectedTransaction.penjual.nama}</p>
                  <p><strong>Email:</strong> {selectedTransaction.penjual.email}</p>
                  <p><strong>Nama Toko:</strong> {selectedTransaction.penjual.toko}</p>
                </div>
              </div>

              {/* Kolom Kanan - Informasi Produk & Transaksi */}
              <div className="preview-details">
                <div className="detail-group">
                  <h4>Detail Produk</h4>
                  <p><strong>Nama Mod:</strong> {selectedTransaction.produk.nama}</p>
                  <p><strong>Kategori:</strong> {selectedTransaction.produk.kategori}</p>
                  <p><strong>Harga:</strong> 
                    <span style={{ 
                      color: '#d32f2f', 
                      fontWeight: '600', 
                      marginLeft: '10px',
                      fontSize: '16px'
                    }}>
                      {selectedTransaction.produk.harga}
                    </span>
                  </p>
                  <p><strong>Deskripsi:</strong></p>
                  <p style={{ 
                    background: '#f8f9fa', 
                    padding: '10px', 
                    borderRadius: '6px',
                    fontSize: '13px',
                    lineHeight: '1.4'
                  }}>
                    {selectedTransaction.produk.deskripsi}
                  </p>
                </div>

                <div className="detail-group">
                  <h4>Informasi Transaksi</h4>
                  <p><strong>Tanggal Transaksi:</strong> {formatDate(selectedTransaction.transaksi.tanggal)}</p>
                  <p><strong>Status:</strong> 
                    <span className={
                      selectedTransaction.transaksi.status === 'done' ? 'status-done' :
                      selectedTransaction.transaksi.status === 'failed' ? 'status-failed' : 'status-pending'
                    } style={{ marginLeft: '10px', padding: '4px 8px' }}>
                      {selectedTransaction.transaksi.status === 'done' ? 'Berhasil' :
                       selectedTransaction.transaksi.status === 'failed' ? 'Gagal' : 'Pending'}
                    </span>
                  </p>
                  <p><strong>Metode Pembayaran:</strong> {selectedTransaction.transaksi.metodePembayaran}</p>
                  <p><strong>Kode Transaksi:</strong> {selectedTransaction.transaksi.kodeUnik}</p>
                  <p><strong>Total Bayar:</strong> 
                    <span style={{ 
                      color: '#d32f2f', 
                      fontWeight: '600', 
                      marginLeft: '10px',
                      fontSize: '16px'
                    }}>
                      {selectedTransaction.transaksi.totalBayar}
                    </span>
                  </p>
                  
                  {selectedTransaction.transaksi.status === 'failed' && selectedTransaction.transaksi.alasanGagal && (
                    <p><strong>Alasan Gagal:</strong> 
                      <span style={{ 
                        color: '#f44336', 
                        marginLeft: '10px',
                        fontStyle: 'italic'
                      }}>
                        {selectedTransaction.transaksi.alasanGagal}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              marginTop: '25px',
              paddingTop: '20px',
              borderTop: '1px solid #eee'
            }}>
              <button 
                className="admin-btn"
                style={{ 
                  background: '#e3f2fd',
                  color: '#1976d2',
                  flex: 1,
                  padding: '12px'
                }}
                onClick={() => {
                  // Aksi untuk mengirim ulang invoice
                  alert('Invoice akan dikirim ke email pembeli');
                }}
              >
                Kirim Ulang Invoice
              </button>
              
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default RiwayatTransaksi;