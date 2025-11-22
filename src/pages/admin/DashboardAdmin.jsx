import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCopy, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../styles/admin/DashboardAdmin.css';
import { FaUserAlt } from 'react-icons/fa';

const DashboardAdmin = () => {
  const { 
    verificationRequests, 
    transactions, 
    withdrawRequests,
    getPendingApprovalsCount, 
    getPendingWithdrawCount,
    getTotalTransactions,
    approveVerification,
    declineVerification,
    approveWithdraw,
    declineWithdraw
  } = useAdmin();

  const [selectedWithdraw, setSelectedWithdraw] = useState(null);
  const [showWithdrawPreview, setShowWithdrawPreview] = useState(false);

  // Hitung statistik real-time
  const pendingApprovalsCount = getPendingApprovalsCount();
  const pendingWithdrawCount = getPendingWithdrawCount();
  const totalTransactions = getTotalTransactions();
  const activeUsers = 156;


  // Filter hanya withdraw yang pending
  const pendingWithdraws = withdrawRequests.filter(request => request.status === 'pending');

  const handleApproveWithdraw = (id) => {
    if (window.confirm("Yakin ingin APPROVE permintaan penarikan ini?")) {
      approveWithdraw(id);
    }
  };

  const handleDeclineWithdraw = (id) => {
    if (window.confirm("Tolak permintaan penarikan ini?")) {
      declineWithdraw(id);
    }
  };

  const handlePreviewWithdraw = (withdraw) => {
    setSelectedWithdraw(withdraw);
    setShowWithdrawPreview(true);
  };

  const closeWithdrawPreview = () => {
    setShowWithdrawPreview(false);
    setSelectedWithdraw(null);
  };

  const handleCopyRekening = (rekening) => {
    navigator.clipboard.writeText(rekening);
    alert('Nomor rekening berhasil disalin!');
  };

  return (
    <AdminLayout activePage="dashboard">
      <h1>Dashboard</h1>

      {/* STATISTICS CARDS */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Transaksi</h3>
          <p className="stat-value">{totalTransactions}</p>
        </div>

        <div className="stat-card">
          <h3>Menunggu Approval</h3>
          <p className="stat-value">{pendingApprovalsCount} Item</p>
          <p className="stat-trend">
            {pendingApprovalsCount > 0 ? 'Perlu perhatian segera' : 'Tidak ada pending'}
          </p>
        </div>

        <div className="stat-card">
          <h3>Penarikan Pending</h3>
          <p className="stat-value">{pendingWithdrawCount} Request</p>
          <p className="stat-trend">
            {pendingWithdrawCount > 0 ? 'Perlu verifikasi' : 'Tidak ada pending'}
          </p>
        </div>
      </div>

      {/* PENDING VERIFICATIONS QUICK VIEW */}
      {pendingApprovalsCount > 0 && (
        <div className="withdraw-section">
          <h2>Verifikasi Produk Menunggu ({pendingApprovalsCount})</h2>
          <div className="admin-table-box">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>No</th>
                  <th style={{ width: '150px' }}>Nama Penjual</th>
                  <th style={{ width: '200px' }}>Nama Produk</th>
                  <th style={{ width: '150px' }}>Harga</th>
                  <th style={{ width: '120px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {verificationRequests
                  .filter(request => request.status === 'pending')
                  .slice(0, 3)
                  .map((request, index) => (
                    <tr key={request.id}>
                      <td>{index + 1}</td>
                      <td>{request.nama}</td>
                      <td>{request.productDetails.nama}</td>
                      <td>{request.productDetails.harga}</td>
                      <td>
                        <span className="status-pending">Pending</span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {pendingApprovalsCount > 3 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '15px', 
                color: '#7b3fe4',
                fontWeight: '500'
              }}>
                <a 
                  href="/admin/verification" 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Lihat {pendingApprovalsCount - 3} permintaan lainnya →
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PERMINTAAN PENARIKAN */}
      <div className="withdraw-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Permintaan Penarikan ({pendingWithdrawCount})</h2>
          {pendingWithdrawCount > 0 && (
            <div style={{ 
              background: '#fff3cd', 
              padding: '8px 16px', 
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#856404'
            }}>
              {pendingWithdrawCount} Request Menunggu
            </div>
          )}
        </div>

        {pendingWithdrawCount === 0 ? (
          <div className="admin-table-box" style={{ textAlign: 'center', padding: '50px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>💸</div>
            <h3 style={{ color: '#666', marginBottom: '10px' }}>Tidak Ada Permintaan Penarikan</h3>
            <p style={{ color: '#999' }}>Semua permintaan penarikan telah diproses</p>
          </div>
        ) : (
          <div className="admin-table-box">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>No</th>
                  <th style={{ width: '150px' }}>Nama</th>
                  <th style={{ width: '150px' }}>Nominal</th>
                  <th style={{ width: '200px' }}>Rekening Tujuan</th>
                  <th style={{ width: '200px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingWithdraws.map((withdraw, index) => (
                  <tr key={withdraw.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div>
                        <div style={{ fontWeight: '600' }}>{withdraw.nama}</div>
                        <div style={{ fontSize: '11px', color: '#666' }}>{withdraw.email}</div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '600', color: '#d32f2f' }}>{withdraw.nominal}</div>
                    </td>
                    <td>
                      <div>
                        <div style={{ fontWeight: '500' }}>{withdraw.bank}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{withdraw.rekening}</div>
                      </div>
                    </td>
                    <td className="admin-actions">
                      <button 
                        className="admin-btn approve-btn"
                        onClick={() => handleApproveWithdraw(withdraw.id)}
                      >
                        Approve
                      </button>
                      <button 
                        className="admin-btn decline-btn"
                        onClick={() => handleDeclineWithdraw(withdraw.id)}
                      >
                        Decline
                      </button>
                      <button 
                        className="admin-btn preview-btn"
                        onClick={() => handlePreviewWithdraw(withdraw)}
                      >
                        <FontAwesomeIcon icon={faEye} /> Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* QUICK ACTIONS */}
      <div className="withdraw-section">
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a 
            href="/admin/verification" 
            className="admin-btn"
            style={{ 
              background: pendingApprovalsCount > 0 ? '#fff3cd' : '#e8f5e8',
              color: pendingApprovalsCount > 0 ? '#856404' : '#2e7d32',
              padding: '12px 20px',
              textDecoration: 'none'
            }}
          >
            {pendingApprovalsCount > 0 ? ' Verifikasi Produk' : '✅ Semua Produk Terverifikasi'}
            {pendingApprovalsCount > 0 && ` (${pendingApprovalsCount})`}
          </a>
          
          <a 
            href="/admin/users" 
            className="admin-btn"
            style={{ 
              background: '#e3f2fd',
              color: '#1976d2',
              padding: '12px 20px',
              textDecoration: 'none'
            }}
          >
            <FaUserAlt/> Kelola User Toko
          </a>
        </div>
      </div>

      {/* PREVIEW MODAL FOR WITHDRAW */}
      {showWithdrawPreview && selectedWithdraw && (
        <div className="preview-modal">
          <div className="preview-content">
            <div className="preview-header">
              <h3>Detail Permintaan Penarikan</h3>
              <button className="close-btn" onClick={closeWithdrawPreview}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="preview-grid">
              <div className="preview-details">
                <div className="detail-group">
                  <h4>Informasi User</h4>
                  <p><strong>Nama:</strong> {selectedWithdraw.nama}</p>
                  <p><strong>Email:</strong> {selectedWithdraw.email}</p>
                  <p><strong>Tanggal Request:</strong> {selectedWithdraw.tanggalRequest}</p>
                </div>

                <div className="detail-group">
                  <h4>Detail Penarikan</h4>
                  <p><strong>Nominal Penarikan:</strong> 
                    <span style={{ color: '#d32f2f', fontWeight: '600', marginLeft: '10px' }}>
                      {selectedWithdraw.nominal}
                    </span>
                  </p>
                  <p><strong>Saldo Sebelum:</strong> {selectedWithdraw.saldoSebelum}</p>
                  <p><strong>Saldo Sesudah:</strong> {selectedWithdraw.saldoSesudah}</p>
                </div>
              </div>

              <div className="preview-details">
                <div className="detail-group">
                  <h4>Informasi Rekening Tujuan</h4>
                  <p><strong>Bank:</strong> {selectedWithdraw.bank}</p>
                  <p><strong>Nomor Rekening:</strong> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                      <span style={{ 
                        background: '#f8f9fa', 
                        padding: '8px 12px', 
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        flex: 1
                      }}>
                        {selectedWithdraw.rekening}
                      </span>
                      <button 
                        className="copy-btn"
                        onClick={() => handleCopyRekening(selectedWithdraw.rekening)}
                        style={{ padding: '8px 12px' }}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                    </div>
                  </p>
                  <p><strong>Atas Nama:</strong> {selectedWithdraw.atasNama}</p>
                </div>

                <div className="detail-group">
                  <h4>Konfirmasi</h4>
                  <p style={{ color: '#666', fontSize: '13px', marginBottom: '15px' }}>
                    Pastikan informasi rekening sudah benar sebelum melakukan approve.
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      className="admin-btn approve-btn"
                      onClick={() => {
                        handleApproveWithdraw(selectedWithdraw.id);
                        closeWithdrawPreview();
                      }}
                      style={{ flex: 1, padding: '12px' }}
                    >
                      Approve Penarikan
                    </button>
                    <button 
                      className="admin-btn decline-btn"
                      onClick={() => {
                        handleDeclineWithdraw(selectedWithdraw.id);
                        closeWithdrawPreview();
                      }}
                      style={{ flex: 1, padding: '12px' }}
                    >
                      Decline Penarikan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DashboardAdmin;