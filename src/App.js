// src/App.jsx (LENGKAP)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useToko } from './context/TokoContext';
import { library } from '@fortawesome/fontawesome-svg-core';
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

// Toko Pages
import DashboardToko from './pages/toko/DashboardToko';
import UploadMod from './pages/toko/UploadMod';
import PesananToko from './pages/toko/PesananToko';
import ProfilToko from './pages/toko/ProfilToko';
import EditMod from './pages/toko/EditMod';
import PreviewModToko from './pages/toko/PreviewModToko';
import BuatToko from './pages/toko/BuatToko';
import TermsAndCondition from './pages/toko/TermsAndCondition';

import './App.css';
import { 
  faGamepad, faHome, faSearch, faShoppingCart, faUser, 
  faStore, faExchangeAlt, faSignOutAlt, faEdit, faSave, 
  faTimes, faCheck, faDownload, faImage, faStar, faStarHalfAlt,
  faBolt, faCartPlus, faClock, faShieldAlt, faTrash,
  faQrcode, faWallet, faLock, faEnvelope, faExclamationTriangle,
  faHeadset, faSyncAlt, faSignInAlt, faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faGamepad, faHome, faSearch, faShoppingCart, faUser,
  faStore, faExchangeAlt, faSignOutAlt, faEdit, faSave,
  faTimes, faCheck, faDownload, faImage, faStar, faStarHalfAlt,
  faBolt, faCartPlus, faClock, faShieldAlt, faTrash,
  faQrcode, faWallet, faLock, faEnvelope, faExclamationTriangle,
  faHeadset, faSyncAlt, faSignInAlt, faArrowLeft
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Seller Route Component
const SellerRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
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

// Component untuk handle layout conditionally
const AppLayout = ({ children, isAuthPage, isTokoPage }) => {
  return (
    <div className="app">
      {/* Jangan render Header di halaman auth dan toko */}
      {!isAuthPage && !isTokoPage && <Header />}
      
      <main className={`app-main ${isAuthPage ? 'app-auth-page' : ''} ${isTokoPage ? 'app-toko-page' : ''}`}>
        {children}
      </main>
      
      {/* Jangan render Footer di halaman auth dan toko */}
      {!isAuthPage && !isTokoPage && <Footer />}
    </div>
  );
};

// Main Routes Component
const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isTokoPage = location.pathname.includes('/toko');

  return (
    <AppLayout isAuthPage={isAuthPage} isTokoPage={isTokoPage}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/before-login" element={<HomeBeforeLogin />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* Toko Routes */}
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
        <Route path="/toko/pesanan" element={
          <SellerRoute>
            <PesananToko />
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
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;