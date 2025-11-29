// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Data produk dengan diskon - struktur yang konsisten
  const featuredProducts = [
    {
      id: 1,
      title: "UD Quester 1.56 UD Quester 1.56 Dengan fitur lengkap serta sound yang sangat realistic",
      category: "ETS2",
      seller: "WARMOD",
      price: 100000, // Harga normal
      originalPrice: 100000,
      discount: 50, // Diskon 50%
      discountEndDate: "2024-12-31",
      image: "/images/products/ets2_20240328_230125_00.png",
      downloads: 192,
    },
    {
      id: 2,
      title: "EP3 Edit Jetbus 3 Pack",
      category: "BUSSID", 
      seller: "Yellow Flash",
      price: 100000,
      originalPrice: 100000,
      discount: 0, // Tidak ada diskon
      discountEndDate: null,
      image: "/images/products/ets2_20240816_171954_00.png",
      downloads: 156,
    },
    {
      id: 3,
      title: "LOCO PACK",
      category: "TRAINZ",
      seller: "WARMOD",
      price: 150000,
      originalPrice: 200000,
      discount: 25, // Diskon 25%
      discountEndDate: "2024-11-30",
      image: "/images/products/locopack.jpg",
      downloads: 89,
    },
    {
      id: 4,
      title: "Old Setra",
      category: "BUSSID",
      seller: "German Mods",
      price: 0,
      originalPrice: 0,
      discount: 0,
      discountEndDate: null,
      image: "/images/products/jwn.png",
      downloads: 67,
    }
  ];

  useEffect(() => {
    // Load products dari localStorage atau gunakan default
    const savedProducts = localStorage.getItem('warmodProducts');
    
    if (!savedProducts) {
      localStorage.setItem('warmodProducts', JSON.stringify(featuredProducts));
    }
    
    filterProducts();
  }, [selectedCategory]);

  const filterProducts = () => {
    let productsToDisplay = featuredProducts;

    // Coba load dari localStorage dulu
    try {
      const savedProducts = localStorage.getItem('warmodProducts');
      if (savedProducts) {
        productsToDisplay = JSON.parse(savedProducts);
      }
    } catch (error) {
      console.error('Error loading products from localStorage:', error);
    }

    if (selectedCategory !== 'all') {
      productsToDisplay = productsToDisplay.filter(product => product.category === selectedCategory);
    }

    setDisplayedProducts(productsToDisplay.slice(0, 8)); // Show first 8 products
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Find and activate the clicked button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      if (btn.textContent === getCategoryText(category)) {
        btn.classList.add('active');
      }
    });
  };

  const getCategoryText = (category) => {
    switch(category) {
      case 'all': return 'Semua';
      case 'ETS2': return 'ETS2';
      case 'BUSSID': return 'BUSSID';
      case 'TRAINZ': return 'TRAINZ';
      default: return category;
    }
  };

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>WARMOD - Premium Game Addons</h1>
          <p>Dapatkan addon terbaik untuk game kesayangan Anda dengan harga terjangkau dan kualitas premium.</p>
        </div>
      </section>

      <main className="container">
        <h2 className="section-title">Addons Terbaru</h2>
        
        <div className="category-filter">
          <button 
            className="filter-btn active" 
            onClick={() => handleCategoryFilter('all')}
          >
            Semua
          </button>
          <button 
            className="filter-btn" 
            onClick={() => handleCategoryFilter('ETS2')}
          >
            ETS2
          </button>
          <button 
            className="filter-btn" 
            onClick={() => handleCategoryFilter('BUSSID')}
          >
            BUSSID
          </button>
          <button 
            className="filter-btn" 
            onClick={() => handleCategoryFilter('TRAINZ')}
          >
            TRAINZ
          </button>
        </div>
        
        <div className="products-grid">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {displayedProducts.length === 0 && (
          <div className="no-results">
            <h3>Tidak ada produk ditemukan</h3>
            <p>Coba pilih kategori lain atau lihat semua produk</p>
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/products" className="cta-button">LIHAT SEMUA PRODUK</Link>
        </div>
      </main>
    </div>
  );
};

export default Home;