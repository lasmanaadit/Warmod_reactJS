// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { FaTrash, FaLock, FaQrcode, FaWallet, FaShoppingCart } from 'react-icons/fa';

const Checkout = () => {
  const { cartItems, removeFromCart } = useCart();
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('qris');

  useEffect(() => {
    // Load email dari profile
    const profileData = JSON.parse(localStorage.getItem('warmodProfile') || '{}');
    if (profileData.email) {
      setDeliveryEmail(profileData.email);
    }
  }, []);

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const adminFee = Math.round(subtotal * 0.01); // 1%
    const total = subtotal + adminFee;
    
    return { subtotal, adminFee, total };
  };

  const { subtotal, adminFee, total } = calculateTotals();

  const selectPaymentMethod = (method) => {
    if (method !== 'dana') { // Dana masih coming soon
      setPaymentMethod(method);
    }
  };

  // PERBAIKAN: Fungsi hapus item yang benar
  const handleRemoveItem = (cartId) => {
    console.log('Removing item with cartId:', cartId);
    removeFromCart(cartId);
  };

  const processCheckout = () => {
    if (cartItems.length === 0) {
      alert('Keranjang masih kosong!');
      return;
    }

    if (!deliveryEmail) {
      alert('Harap masukkan email untuk pengiriman mod!');
      return;
    }

    // Validasi email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(deliveryEmail)) {
      alert('Format email tidak valid!');
      return;
    }

    // Save order data
    const orderData = {
      items: cartItems,
      deliveryEmail,
      paymentMethod,
      subtotal,
      adminFee,
      total,
      orderNumber: 'WM-' + Date.now(),
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 jam
      status: 'pending'
    };

    localStorage.setItem('warmodCurrentOrder', JSON.stringify(orderData));
    
    // Redirect ke payment
    setTimeout(() => {
      window.location.href = '/payment';
    }, 500);
  };

  if (cartItems.length === 0) {
    return (
      <section className="checkout">
        <div className="container">
          <h1 className="checkout-title">Keranjang</h1>
          <div className="empty-cart">
            <i><FaShoppingCart/></i>
            <h3>Keranjang Kosong</h3>
            <p>Belum ada item di keranjang Anda</p>
            <a href="/products" className="cta-button" style={{marginTop: '15px'}}>Belanja Sekarang</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout">
      <div className="container">
        <h1 className="checkout-title">Keranjang</h1>
        
        <div className="checkout-content">
          {/* Cart Items */}
          <div className="cart-items">
            <h2>Item dalam Keranjang ({cartItems.length})</h2>
            <div id="cart-items-container">
              {cartItems.map((item, index) => (
                <div key={item.cartId || index} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-title">{item.title}</div>
                    <div className="cart-item-category">{item.category}</div>
                    <div className="cart-item-seller">{item.seller}</div>
                    {item.quantity > 1 && (
                      <div className="cart-item-quantity">
                        Quantity: {item.quantity}
                      </div>
                    )}
                  </div>
                  <div className="cart-item-price">Rp. {item.price.toLocaleString()}</div>
                  {/* PERBAIKAN: Gunakan cartId untuk remove */}
                  <button 
                    className="cart-item-remove" 
                    onClick={() => handleRemoveItem(item.cartId)}
                    title="Hapus dari keranjang"
                  >
                    <FaTrash/>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="payment-summary">
            <h2>Ringkasan Pembayaran</h2>
            <div className="summary-content">
              {/* Email Input */}
              <div className="email-input-section">
                <h3>Email untuk Pengiriman Mod</h3>
                <div className="email-input-group">
                  <input 
                    type="email" 
                    id="delivery-email" 
                    placeholder="Masukkan email untuk pengiriman mod" 
                    className="email-input"
                    value={deliveryEmail}
                    onChange={(e) => setDeliveryEmail(e.target.value)}
                  />
                </div>
                <p className="email-help">Mod akan dikirim ke email ini setelah pembayaran berhasil</p>
              </div>
              
              {/* Payment Method */}
              <div className="payment-method-section">
                <h3>Metode Pembayaran</h3>
                <div className="payment-options-simple">
                  <div 
                    className={`payment-option-simple ${paymentMethod === 'qris' ? 'active' : ''}`} 
                    data-method="qris" 
                    onClick={() => selectPaymentMethod('qris')}
                  >
                    <FaQrcode/>
                    <span>QRIS</span>
                    <div className="payment-badge">Direkomendasikan</div>
                  </div>
                  <div className="payment-option-simple disabled" data-method="dana">
                   <FaWallet/>
                    <span>DANA</span>
                    <div className="payment-badge coming-soon">Segera Hadir</div>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="summary-item">
                <span>Subtotal ({cartItems.length} item)</span>
                <span id="subtotal">Rp. {subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span>Biaya Layanan (1%)</span>
                <span id="admin-fee">Rp. {adminFee.toLocaleString()}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-total">
                <span>Total</span>
                <span id="total-amount">Rp. {total.toLocaleString()}</span>
              </div>
              
              {/* Checkout Button */}
              <button className="checkout-btn" onClick={processCheckout}>
                <FaLock/>
                Lanjut ke Pembayaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;