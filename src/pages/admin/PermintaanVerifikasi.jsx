import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import '../../styles/admin/PermintaanVerifikasi.css';

const PermintaanVerifikasi = () => {
  const { 
    verificationRequests, 
    approveVerification, 
    declineVerification 
  } = useAdmin();

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleApprove = (id) => {
    if (window.confirm("Yakin ingin APPROVE permintaan ini?")) {
      approveVerification(id);
    }
  };

  const handleDecline = (id) => {
    if (window.confirm("Tolak permintaan ini?")) {
      declineVerification(id);
    }
  };

  const handlePreview = (request) => {
    setSelectedRequest(request);
    setShowPreview(true);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('Link berhasil disalin!');
  };

  const closePreview = () => {
    setShowPreview(false);
    setSelectedRequest(null);
  };

  // Filter hanya yang pending
  const pendingRequests = verificationRequests.filter(request => request.status === 'pending');

  return (
    <AdminLayout activePage="verification">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Permintaan Verifikasi</h1>
        <div style={{ 
          background: '#e8f5e8', 
          padding: '8px 16px', 
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#2e7d32'
        }}>
          {pendingRequests.length} Permintaan Menunggu
        </div>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="admin-table-box" style={{ textAlign: 'center', padding: '50px' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
          <h3 style={{ color: '#666', marginBottom: '10px' }}>Tidak Ada Permintaan Verifikasi</h3>
          <p style={{ color: '#999' }}>Semua produk telah diverifikasi</p>
        </div>
      ) : (
        <div className="admin-table-box">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>No</th>
                <th style={{ width: '150px' }}>Nama</th>
                <th style={{ width: '150px' }}>Pembayaran</th>
                <th style={{ width: '200px' }}>Tujuan</th>
                <th style={{ width: '200px' }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {pendingRequests.map((request, index) => (
                <tr key={request.id}>
                  <td>{index + 1}</td>
                  <td>{request.nama}</td>
                  <td>{request.pembayaran}</td>
                  <td>
                    <div className="drive-link">
                      <span>{request.driveLink}</span>
                      <button 
                        className="copy-btn"
                        onClick={() => handleCopyLink(request.driveLink)}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                    </div>
                  </td>
                  <td className="admin-actions">
                    <button 
                      className="admin-btn approve-btn"
                      onClick={() => handleApprove(request.id)}
                    >
                      Approve
                    </button>
                    <button 
                      className="admin-btn decline-btn"
                      onClick={() => handleDecline(request.id)}
                    >
                      Decline
                    </button>
                    <button 
                      className="admin-btn preview-btn"
                      onClick={() => handlePreview(request)}
                    >
                      <FontAwesomeIcon icon={faEye} /> Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedRequest && (
        <div className="preview-modal">
          <div className="preview-content">
            <div className="preview-header">
              <h3>Preview Produk - {selectedRequest.productDetails.nama}</h3>
              <button className="close-btn" onClick={closePreview}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="preview-grid">
              <div className="preview-images">
                <h4>Gambar Produk ({selectedRequest.productDetails.gambar.length} gambar)</h4>
                {selectedRequest.productDetails.gambar.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`Preview ${index + 1}`}
                    className="preview-image"
                  />
                ))}
              </div>

              <div className="preview-details">
                <div className="detail-group">
                  <h4>Informasi Penjual</h4>
                  <p><strong>Nama:</strong> {selectedRequest.nama}</p>
                  <p><strong>Jenis Pembayaran:</strong> {selectedRequest.pembayaran}</p>
                </div>

                <div className="detail-group">
                  <h4>Detail Produk</h4>
                  <p><strong>Nama Produk:</strong> {selectedRequest.productDetails.nama}</p>
                  <p><strong>Harga:</strong> {selectedRequest.productDetails.harga}</p>
                  <p><strong>Kategori:</strong> {selectedRequest.productDetails.kategori}</p>
                  <p><strong>Tanggal Upload:</strong> {selectedRequest.productDetails.tanggalUpload}</p>
                </div>

                <div className="detail-group">
                  <h4>Deskripsi</h4>
                  <p>{selectedRequest.productDetails.deskripsi}</p>
                </div>

                <div className="detail-group">
                  <h4>Fitur Utama</h4>
                  <div className="product-features">
                    {selectedRequest.productDetails.fitur.map((fitur, index) => (
                      <span key={index} className="feature-tag">
                        {fitur}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="detail-group">
                  <h4>Google Drive Link</h4>
                  <div className="drive-link-container">
                    <div className="drive-link">
                      <span>{selectedRequest.driveLink}</span>
                      <button 
                        className="copy-btn"
                        onClick={() => handleCopyLink(selectedRequest.driveLink)}
                      >
                        <FontAwesomeIcon icon={faCopy} /> Copy
                      </button>
                    </div>
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

export default PermintaanVerifikasi;