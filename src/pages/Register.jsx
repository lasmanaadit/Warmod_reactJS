// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Auth.module.css'; // ← CSS Module

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
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
    
    // Simulasi registrasi berhasil
    setShowPopup(true);
    
    // Save user data to localStorage
    const userData = {
      name: formData.fullname,
      email: formData.email
    };
    localStorage.setItem('warmodProfile', JSON.stringify(userData));
    
    setTimeout(() => {
      setShowPopup(false);
      window.location.href = '/login';
    }, 1500);
  };

  return (
    <div className={styles.authContainer}> {/* ← Gunakan CSS Module */}
      {/* Back Button */}
      <Link to="/login" className={styles.backBtn}>
        <span className={styles.arrow}>‹</span> Back
      </Link>

      <div className={styles.authBox}> {/* ← Gunakan CSS Module */}
        <h2 className={styles.authTitle}>Create an Account</h2>
        <p className={styles.authSubtitle}>
          Sudah punya akun? <Link to="/login">Login Disini</Link>
        </p>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <label htmlFor="fullname" className={styles.authLabel}>Full Name</label>
          <input 
            type="text" 
            id="fullname" 
            name="fullname"
            placeholder="Masukkan nama lengkap anda" 
            value={formData.fullname}
            onChange={handleChange}
            className={styles.authInput}
            required 
          />

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

          <button type="submit" className={styles.authButton}>Register</button>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className={`${styles.authPopup} ${styles.show}`}>
          Register berhasil! Anda akan diarahkan ke halaman login
        </div>
      )}
    </div>
  );
};

export default Register;