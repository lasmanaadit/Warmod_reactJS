// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Load products from localStorage or use default
  const featuredProducts = JSON.parse(localStorage.getItem('warmodProducts')) || [
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
    {
      id: 3,
      title: "Scania R500 Premium",
      category: "ETS2",
      seller: "TruckMaster",
      price: 150000,
      image: "ets2_20240816_171521_00.png",
      downloads: 89
    },
    {
      id: 4,
      title: "Mercedes Tourismo",
      category: "BUSSID",
      seller: "BusLover",
      price: 120000,
      image: "ets2_20240815_211333_00.png",
      downloads: 67
    },
    {
      id: 5,
      title: "Train Simulator Pack",
      category: "TRAINZ",
      seller: "RailExpert",
      price: 180000,
      image: "jwn.png",
      downloads: 45
    }
  ];
  

  useEffect(() => {
    // Save to localStorage if not exists
    if (!localStorage.getItem('warmodProducts')) {
      localStorage.setItem('warmodProducts', JSON.stringify(featuredProducts));
    }
    
    filterProducts();
  }, [selectedCategory]);

  const filterProducts = () => {
    if (selectedCategory === 'all') {
      setDisplayedProducts(featuredProducts.slice(0, 8)); // Show first 8 products
    } else {
      const filtered = featuredProducts.filter(product => 
        product.category === selectedCategory
      ).slice(0, 8);
      setDisplayedProducts(filtered);
    }
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