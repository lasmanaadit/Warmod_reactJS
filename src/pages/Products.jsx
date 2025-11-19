// src/pages/Products.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';

const Products = () => {
  const allProducts = [
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
    },
    // ... semua produk dari moreitems.html
    {
      id: 13,
      title: "Old Setra",
      category: "BUSSID",
      seller: "WARMOD",
      price: 25000,
      image: "jwn.png",
      downloads: 78
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Semua Produk WARMOD</h1>
          <p>Jelajahi koleksi lengkap addon premium untuk game kesayangan Anda</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container">
        <h2 className="section-title">Semua Addons</h2>
        
        {/* Category Filter */}
        <div className="category-filter">
          <button className="filter-btn active" data-category="all">Semua</button>
          <button className="filter-btn" data-category="ETS2">ETS2</button>
          <button className="filter-btn" data-category="BUSSID">BUSSID</button>
          <button className="filter-btn" data-category="TRAINZ">TRAINZ</button>
        </div>
        
        {/* Products Grid */}
        <div className="products-grid">
          {allProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="pagination">
          {/* Pagination akan diimplementasi nanti */}
        </div>
      </main>
    </div>
  );
};

export default Products;