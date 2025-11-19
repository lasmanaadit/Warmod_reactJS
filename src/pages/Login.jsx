// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Auth.module.css'; // ← CSS Module

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulasi login berhasil
    setShowPopup(true);
    
    // Save user data to localStorage
    const userData = {
      name: 'Lasmanaadit',
      email: formData.email
    };
    localStorage.setItem('warmodProfile', JSON.stringify(userData));
    localStorage.setItem('warmodIsLoggedIn', 'true');
    
    setTimeout(() => {
      setShowPopup(false);
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className={styles.authContainer}> {/* ← Gunakan CSS Module */}
      {/* Back Button */}
      <Link to="/before-login" className={styles.backBtn}>
        <span className={styles.arrow}>‹</span> Back
      </Link>

      <div className={styles.authBox}> {/* ← Gunakan CSS Module */}
        <h2 className={styles.authTitle}>Log in</h2>
        <p className={styles.authSubtitle}>
          Tidak Mempunyai Akun? <Link to="/register">Daftar Disini</Link>
        </p>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.authLabel}>Email address</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            placeholder="Masukkan email anda" 
            value={formData.email}
            onChange={handleChange}
            className={styles.authInput}
            required 
          />

          <label htmlFor="password" className={styles.authLabel}>Password</label>
          <div className={styles.passwordField}>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password"
              placeholder="Masukkan password" 
              value={formData.password}
              onChange={handleChange}
              className={styles.authInput}
              required 
            />
            <span 
              className={styles.toggle}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          <Link to="#" className={styles.forgotLink}>Lupa password?</Link>
          <button type="submit" className={styles.authButton}>Log in</button>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className={`${styles.authPopup} ${styles.show}`}>
          Login berhasil!
        </div>
      )}
    </div>
  );
};

export default Login;