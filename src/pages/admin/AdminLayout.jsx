import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faCheckCircle, 
  faUsers, 
  faHistory,
  faSignOutAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/admin/AdminLayout.css'; 

const AdminLayout = ({ children, activePage }) => {
  const { adminData, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/admin/login';
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: faTachometerAlt, label: 'Dashboard', key: 'dashboard' },
    { path: '/admin/verification', icon: faCheckCircle, label: 'Permintaan Verifikasi', key: 'verification' },
    { path: '/admin/users', icon: faUsers, label: 'Kelola User Toko', key: 'users' },
    { path: '/admin/transactions', icon: faHistory, label: 'Riwayat Transaksi', key: 'transactions' }
  ];

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-profile">
          <div className="admin-avatar">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="admin-info">
            <h4>{adminData?.nama || 'Admin'}</h4>
            <p>{adminData?.email || 'admin@gmail.com'}</p>
          </div>
        </div>

        <nav className="admin-nav">
          {menuItems.map(item => (
            <a
              key={item.key}
              href={item.path}
              className={activePage === item.key ? 'active' : ''}
            >
              <FontAwesomeIcon icon={item.icon} className="nav-icon" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="admin-logout">
          <a href="#" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
            Logout
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;