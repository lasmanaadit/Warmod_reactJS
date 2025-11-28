// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserAuthProvider, useUserAuth } from './context/UserAuthContext'; // <- PERUBAHAN DI SINI
import { TokoProvider, useToko } from './context/TokoContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import { SearchProvider } from './context/SearchContext';
import { AdminProvider } from './context/AdminContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import HomeBeforeLogin from './pages/HomeBeforeLogin';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import PenarikanSaldo from './pages/toko/PenarikanSaldo';

// Toko Pages
import DashboardToko from './pages/toko/DashboardToko';
import UploadMod from './pages/toko/UploadMod';
import TransaksiToko from './pages/toko/TransaksiToko';
import ProfilToko from './pages/toko/ProfilToko';
import EditMod from './pages/toko/EditMod';
import PreviewModToko from './pages/toko/PreviewModToko';
import BuatToko from './pages/toko/BuatToko';
import TermsAndCondition from './pages/toko/TermsAndCondition';
import DiskonToko from './pages/toko/DiskonToko';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import PermintaanVerifikasi from './pages/admin/PermintaanVerifikasi';
import KelolaUser from './pages/admin/KelolaUser';
import RiwayatTransaksi from './pages/admin/RiwayatTransaksi';

import PrivacyPolicy from './pages/footer/PrivacyPolicy';
import TermsOfService from './pages/footer/TermsOfService';
import HowToBuy from './pages/footer/HowToBuy';
import HowToInstall from './pages/footer/HowToInstall';
import AboutUs from './pages/footer/AboutUs';

import './App.css';
import { 
  faGamepad, faHome, faSearch, faShoppingCart, faUser, 
  faStore, faExchangeAlt, faSignOutAlt, faEdit, faSave, 
  faTimes, faCheck, faDownload, faImage, faStar, faStarHalfAlt,
  faBolt, faCartPlus, faClock, faShieldAlt, faTrash,
  faQrcode, faWallet, faLock, faEnvelope, faExclamationTriangle,
  faHeadset, faSyncAlt, faSignInAlt, faArrowLeft,
  faTachometerAlt, faCheckCircle, faUsers, faHistory
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faGamepad, faHome, faSearch, faShoppingCart, faUser,
  faStore, faExchangeAlt, faSignOutAlt, faEdit, faSave,
  faTimes, faCheck, faDownload, faImage, faStar, faStarHalfAlt,
  faBolt, faCartPlus, faClock, faShieldAlt, faTrash,
  faQrcode, faWallet, faLock, faEnvelope, faExclamationTriangle,
  faHeadset, faSyncAlt, faSignInAlt, faArrowLeft,
  faTachometerAlt, faCheckCircle, faUsers, faHistory
);

// ========== PROTECTED ROUTE COMPONENTS ==========

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUserAuth(); // <- PERUBAHAN DI SINI
  
  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect jika sudah login)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUserAuth(); // <- PERUBAHAN DI SINI
  
  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }
  
  return !isAuthenticated ? children : <Navigate to="/" />;
};

// Seller Route Component
const SellerRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUserAuth(); // <- PERUBAHAN DI SINI
  const { tokoStatus } = useToko();
  
  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (tokoStatus !== 'seller') {
    return <Navigate to="/profile" />;
  }
  
  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { isAdminLoggedIn, loading } = useAdminAuth();
  
  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }
  
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" />;
};

// ========== APP LAYOUT COMPONENT ==========
const AppLayout = ({ children, isAuthPage, isTokoPage, isAdminPage }) => {
  const { isAuthenticated } = useUserAuth();
  
  return (
    <div className="app">
      {!isAuthPage && !isTokoPage && !isAdminPage && <Header />}
      
      <main className={`app-main ${isAuthPage ? 'app-auth-page' : ''} ${isTokoPage ? 'app-toko-page' : ''} ${isAdminPage ? 'app-admin-page' : ''}`}>
        {children}
      </main>
      
      {!isAuthPage && !isTokoPage && !isAdminPage && <Footer />}
    </div>
  );
};

// ========== MAIN ROUTES COMPONENT ==========
const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isTokoPage = location.pathname.includes('/toko');
  const isAdminPage = location.pathname.includes('/admin');

  return (
    <AppLayout isAuthPage={isAuthPage} isTokoPage={isTokoPage} isAdminPage={isAdminPage}>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/before-login" element={
          <PublicRoute>
            <HomeBeforeLogin />
          </PublicRoute>
        } />
        
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/how-to-buy" element={<HowToBuy />} />
        <Route path="/how-to-install" element={<HowToInstall />} />
        <Route path="/about-us" element={<AboutUs />} />
        
        {/* ========== AUTH ROUTES ========== */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        
        {/* ========== PROTECTED ROUTES ========== */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        
        <Route path="/payment" element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* ========== TOKO ROUTES ========== */}
        <Route path="/toko/buat-toko" element={
          <ProtectedRoute>
            <BuatToko />
          </ProtectedRoute>
        } />
        
        <Route path="/toko/terms" element={
          <ProtectedRoute>
            <TermsAndCondition />
          </ProtectedRoute>
        } />
        
        <Route path="/toko/dashboard" element={
          <SellerRoute>
            <DashboardToko />
          </SellerRoute>
        } />
        
        <Route path="/toko/upload" element={
          <SellerRoute>
            <UploadMod />
          </SellerRoute>
        } />
        
        <Route path="/toko/profil" element={
          <SellerRoute>
            <ProfilToko />
          </SellerRoute>
        } />
        
        <Route path="/toko/edit-mod" element={
          <SellerRoute>
            <EditMod />
          </SellerRoute>
        } />
        
        <Route path="/toko/preview/:modId" element={
          <SellerRoute>
            <PreviewModToko />
          </SellerRoute>
        } />
        
        <Route path="/toko/penarikan" element={
          <SellerRoute>
            <PenarikanSaldo />
          </SellerRoute>
        } />
        
        <Route path="/toko/transaksi" element={
          <SellerRoute>
            <TransaksiToko />
          </SellerRoute>
        } />
        <Route path="/toko/diskon" element={
          <SellerRoute>
            <DiskonToko />
          </SellerRoute>
        } />
        
        {/* ========== ADMIN ROUTES ========== */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <DashboardAdmin />
          </AdminRoute>
        } />
        
        <Route path="/admin/verification" element={
          <AdminRoute>
            <PermintaanVerifikasi />
          </AdminRoute>
        } />
        
        <Route path="/admin/users" element={
          <AdminRoute>
            <KelolaUser />
          </AdminRoute>
        } />
        
        <Route path="/admin/transactions" element={
          <AdminRoute>
            <RiwayatTransaksi />
          </AdminRoute>
        } />
        
        {/* ========== FALLBACK ROUTES ========== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppLayout>
  );
};

// ========== MAIN APP COMPONENT ==========
function App() {
  return (
    <UserAuthProvider>
      <TokoProvider>
        <AdminAuthProvider>
          <AdminProvider>
            <CartProvider>
              <SearchProvider> {/* TAMBAH INI */}
                <Router>
                  <AppRoutes />
                </Router>
              </SearchProvider> {/* TAMBAH INI */}
            </CartProvider>
          </AdminProvider>
        </AdminAuthProvider>
      </TokoProvider>
    </UserAuthProvider>
  );
}

export default App;