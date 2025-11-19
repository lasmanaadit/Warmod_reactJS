// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard'; // ← PATH YANG BENAR

const Home = () => {
  // Data produk
  const featuredProducts = [
    {
      id: 1,
      title: "UD Quester 1.56",
      category: "ETS2",
      seller: "WARMOD",
      price: 100000,
      image: "ets2_20240328_230125_00.png",
      downloads: 192
    },
    {
      id: 2,
      title: "EP3 Edit Jetbus 3 Pack",
      category: "BUSSID", 
      seller: "Yellow Flash",
      price: 100000,
      image: "ets2_20240816_171954_00.png",
      downloads: 156
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>WARMOD - Premium Game Addons</h1>
          <p>Dapatkan addon terbaik untuk game kesayangan Anda dengan harga terjangkau dan kualitas premium.</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container">
        <h2 className="section-title">Addons Terbaru</h2>
        
        {/* Category Filter */}
        <div className="category-filter">
          <button className="filter-btn active" data-category="all">Semua</button>
          <button className="filter-btn" data-category="ETS2">ETS2</button>
          <button className="filter-btn" data-category="BUSSID">BUSSID</button>
          <button className="filter-btn" data-category="TRAINZ">TRAINZ</button>
        </div>
        
        {/* Products Grid */}
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/products" className="cta-button">MORE</Link>
        </div>
      </main>
    </div>
  );
};

export default Home;