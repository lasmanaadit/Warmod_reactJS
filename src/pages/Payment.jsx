// src/pages/Payment.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import {  FaShoppingBasket, FaClock, FaExclamationTriangle, FaDownload, FaCheck } from 'react-icons/fa';

const Payment = () => {
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('pending');

  const PAYMENT_EXPIRY_SECONDS = 50; // 50 detik untuk testing

  useEffect(() => {
    loadOrderData();
  }, []);

  useEffect(() => {
    if (!orderData) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const expiryTime = new Date(orderData.expiresAt).getTime();
      const remaining = expiryTime - now;

      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        handlePaymentExpired();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [orderData]);

  const loadOrderData = () => {
    const savedOrder = localStorage.getItem('warmodCurrentOrder');
    if (savedOrder) {
      const order = JSON.parse(savedOrder);
      setOrderData(order);
      
      // Hitung waktu tersisa
      const now = new Date().getTime();
      const expiryTime = new Date(order.expiresAt).getTime();
      setTimeLeft(expiryTime - now);
    }
  };

  const handlePaymentExpired = () => {
    if (orderData) {
      const updatedOrder = { ...orderData, status: 'expired' };
      localStorage.setItem('warmodCurrentOrder', JSON.stringify(updatedOrder));
      setOrderData(updatedOrder);
      showNotification('Waktu pembayaran telah habis. Transaksi telah dihapus.');
    }
  };

  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) return '00:00:00';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  const calculateTotals = () => {
    if (!orderData) return { subtotal: 0, adminFee: 0, total: 0 };
    
    const subtotal = orderData.items.reduce((sum, item) => sum + item.price, 0);
    const adminFee = Math.round(subtotal * 0.01);
    const total = subtotal + adminFee;
    
    return { subtotal, adminFee, total };
  };

  const downloadQRIS = () => {
    const orderNumber = orderData?.orderNumber || 'WM-001234';
    showNotification('QR Code berhasil didownload!');
    // Implementasi download QRIS sebenarnya
  };

  const simulatePaymentSuccess = () => {
    setPaymentStatus('paid');
    
    // Update order status
    const updatedOrder = { 
      ...orderData, 
      status: 'paid',
      paidAt: new Date().toISOString()
    };
    
    // Save to order history
    const orderHistory = JSON.parse(localStorage.getItem('warmodOrderHistory') || '[]');
    orderHistory.push(updatedOrder);
    localStorage.setItem('warmodOrderHistory', JSON.stringify(orderHistory));
    
    // Clear cart and current order
    clearCart();
    setTimeout(() => {
      localStorage.removeItem('warmodCurrentOrder');
      showNotification('Pembayaran berhasil! Addon akan dikirim ke email Anda.');
    }, 3000);
  };

  const showNotification = (message) => {
    // Implementasi notifikasi
    alert(message); // Temporary
  };

  const { subtotal, adminFee, total } = calculateTotals();

  if (!orderData || !orderData.items || orderData.items.length === 0 || orderData.status === 'expired') {
    return (
      <section className="payment">
        <div className="container">
          <div className="empty-transaction">
            <div className="empty-message">
              <FaShoppingBasket/>
              <h2>Tidak ada Transaksi berlangsung</h2>
              <p>Silahkan ke beranda untuk mengisi daftar transaksi</p>
              <a href="/" className="cta-button">Kembali ke Beranda</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const getExpiryClass = () => {
    if (timeLeft <= 300000) return 'critical'; // 5 menit
    if (timeLeft <= 1800000) return 'warning'; // 30 menit
    return '';
  };

  return (
    <section className="payment">
      <div className="container">
        <div className="payment-content">
          {/* Order Summary */}
          <div className="order-summary">
            <div className="payment-header">
              <h1>Pembayaran</h1>
              <div className="order-id">Order #{orderData.orderNumber || 'WM-001234'}</div>
            </div>

            <div className="order-items">
              <h3>Rincian Pesanan</h3>
              <div id="payment-items">
                {orderData.items.map((item, index) => (
                  <div key={index} className="payment-item">
                    <div className="item-info">
                      <div className="item-name">{item.title}</div>
                      <div className="item-category">{item.category} • {item.seller}</div>
                    </div>
                    <div className="item-price">Rp. {item.price.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-total">
              <div className="total-line">
                <span>Subtotal</span>
                <span id="payment-subtotal">Rp. {subtotal.toLocaleString()}</span>
              </div>
              <div className="total-line">
                <span>Biaya Layanan</span>
                <span id="payment-admin">Rp. {adminFee.toLocaleString()}</span>
              </div>
              <div className="total-divider"></div>
              <div className="total-final">
                <span>Total Pembayaran</span>
                <span id="payment-total">Rp. {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="payment-instructions">
              <h4>Instruksi Pembayaran:</h4>
              <ol>
                <li>Buka aplikasi e-wallet atau mobile banking Anda</li>
                <li>Pilih fitur scan QRIS</li>
                <li>Arahkan kamera ke kode QR di samping</li>
                <li>Konfirmasi jumlah pembayaran</li>
                <li>Tunggu hingga pembayaran berhasil</li>
                <li>Mod Otomatis dikirim di email</li>
              </ol>
            </div>
          </div>

          {/* QRIS Payment */}
          <div className="qris-payment">
            <div className="qris-card">
              <div className="qris-header">
                <h2>QRIS Payment</h2>
              </div>
              
              <div className={`payment-expiry ${getExpiryClass()}`}>
                <FaClock/>
                <div className="expiry-info">
                  <div className="expiry-text">Bayar sebelum:</div>
                  <div className="expiry-date">{formatDate(orderData.expiresAt)}</div>
                  <div className="expiry-timer">{formatTime(timeLeft)}</div>
                </div>
              </div>

              <div className="qris-code">
                <img src="qris.png" alt="QRIS Code" id="qris-image" />
                {timeLeft <= 0 && (
                  <div className="qris-overlay active">
                    <div className="expired-text">
                      <FaExclamationTriangle/>
                      <span>Kode QRIS Expired</span>
                    </div>
                  </div>
                )}
              </div>
                
              <div className="qris-amount">
                <span className="amount-label">Total</span>
                <span className="amount-value" id="qris-amount">Rp. {total.toLocaleString()}</span>
              </div>

              <div className="qris-actions">
                <button className="download-btn" onClick={downloadQRIS}>
                  <FaDownload/>
                  Download QR Code
                </button>
                {/* Debug button untuk testing */}
                <button className="refresh-btn" onClick={simulatePaymentSuccess} style={{marginLeft: '10px'}}>
                  <FaCheck/>
                  Simulate Success
                </button>
              </div>

              <div className="payment-status">
                <div className="status-indicator">
                  <div className={`status-dot ${paymentStatus === 'paid' ? 'paid' : ''}`}></div>
                  <span id="payment-status-text" className={paymentStatus === 'paid' ? 'paid' : ''}>
                    {paymentStatus === 'paid' ? 'Pembayaran Berhasil' : 'Menunggu Pembayaran'}
                  </span>
                </div>
                <p className="status-description">
                  {paymentStatus === 'paid' 
                    ? 'Pembayaran Anda telah berhasil. Addon akan segera dikirim ke email Anda.'
                    : 'Pembayaran akan diproses otomatis setelah Anda melakukan transfer'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;