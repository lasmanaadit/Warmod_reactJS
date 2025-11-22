// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext'; // <- PERUBAHAN DI SINI
import styles from '../styles/Auth.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useUserAuth(); // <- PERUBAHAN DI SINI
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const result = login(formData.email, formData.password);
    if (result.success) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/');
      }, 1500);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <Link to="/before-login" className={styles.backBtn}>
        <span className={styles.arrow}>‹</span> Back
      </Link>

      <div className={styles.authBox}>
        <h2 className={styles.authTitle}>Log in</h2>
        <p className={styles.authSubtitle}>
          Tidak Mempunyai Akun? <Link to="/register">Daftar Disini</Link>
        </p>

        {error && <div className={styles.errorMessage}>{error}</div>}

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

        {/* Demo Accounts Info */}
        <div className={styles.demoAccounts}>
          <h4>Demo Accounts:</h4>
          <p>Email: user@example.com | Password: password123</p>
          <p>Email: test@example.com | Password: test123</p>
          <p>Email: demo@example.com | Password: demo123</p>
        </div>
      </div>

      {showPopup && (
        <div className={`${styles.authPopup} ${styles.show}`}>
          Login berhasil!
        </div>
      )}
    </div>
  );
};

export default Login;