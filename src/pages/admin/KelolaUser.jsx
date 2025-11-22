import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import '../../styles/admin/KelolaUser.css';

const KelolaUser = () => {
  const { users, suspendUser, unsuspendUser } = useAdmin();

  const handleSuspend = (id) => {
    if (window.confirm("Yakin ingin men-suspend user ini?")) {
      suspendUser(id);
    }
  };

  const handleUnsuspend = (id) => {
    if (window.confirm("Yakin ingin mengaktifkan kembali user ini?")) {
      unsuspendUser(id);
    }
  };

  // Hitung statistik
  const activeUsers = users.filter(user => user.status === 'active').length;
  const suspendedUsers = users.filter(user => user.status === 'suspended').length;
  const totalUsers = users.length;

  return (
    <AdminLayout activePage="users">
      <h1>Kelola User Toko</h1>

      {/* User Stats */}
      <div className="user-stats">
        <div className="user-stat-card">
          <div className="user-stat-value">{activeUsers}</div>
          <div className="user-stat-label">Seller Mod Aktif</div>
        </div>
        <div className="user-stat-card">
          <div className="user-stat-value">{suspendedUsers}</div>
          <div className="user-stat-label">Suspended</div>
        </div>
      </div>

      <div className="admin-table-box">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>No</th>
              <th style={{ width: '180px' }}>Nama</th>
              <th style={{ width: '200px' }}>Toko</th>
              <th style={{ width: '100px' }}>Status</th>
              <th style={{ width: '160px' }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.nama}</td>
                <td>{user.toko}</td>
                <td>
                  <span className={user.status === 'active' ? 'status-active' : 'status-suspended'}>
                    {user.status === 'active' ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td className="admin-actions">
                  {user.status === 'active' ? (
                    <button 
                      className="admin-btn suspend-btn"
                      onClick={() => handleSuspend(user.id)}
                    >
                      Suspend
                    </button>
                  ) : (
                    <button 
                      className="admin-btn unsuspend-btn"
                      onClick={() => handleUnsuspend(user.id)}
                    >
                      Unsuspend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default KelolaUser;