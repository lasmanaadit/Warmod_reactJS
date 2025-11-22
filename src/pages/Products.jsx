// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { useSearch } from '../context/SearchContext';
import { FaSearch } from 'react-icons/fa';

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { searchTerm } = useSearch();
  const productsPerPage = 8;

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndPaginateProducts();
  }, [allProducts, currentPage, selectedCategory, searchTerm]);

  const loadProducts = () => {
    const defaultProducts = [
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
        id: 13,
        title: "Old Setra",
        category: "BUSSID",
        seller: "WARMOD",
        price: 25000,
        image: "jwn.png",
        downloads: 78
      },
      {
        id: 14,
        title: "Volvo FH16 2020",
        category: "ETS2",
        seller: "TruckMaster",
        price: 175000,
        image: "ets2_20240816_171521_00.png",
        downloads: 120
      },
      {
        id: 15,
        title: "MAN Lion's Coach",
        category: "BUSSID",
        seller: "BusExpert",
        price: 135000,
        image: "ets2_20240815_211333_00.png",
        downloads: 95
      },
      {
        id: 16,
        title: "Japanese Train Pack",
        category: "TRAINZ",
        seller: "RailMaster",
        price: 220000,
        image: "jwn.png",
        downloads: 60
      },
      {
        id: 17,
        title: "Scania S730",
        category: "ETS2",
        seller: "TruckLover",
        price: 190000,
        image: "ets2_20240328_230125_00.png",
        downloads: 110
      },
      {
        id: 18,
        title: "Mercedes Intouro",
        category: "BUSSID",
        seller: "BusPro",
        price: 125000,
        image: "ets2_20240816_171954_00.png",
        downloads: 85
      },
      {
        id: 19,
        title: "European Train Set",
        category: "TRAINZ",
        seller: "RailExpert",
        price: 250000,
        image: "jwn.png",
        downloads: 45
      },
      {
        id: 20,
        title: "Renault T Highline",
        category: "ETS2",
        seller: "TruckPro",
        price: 165000,
        image: "ets2_20240816_171521_00.png",
        downloads: 75
      },
      {
        id: 21,
        title: "Setra MultiClass",
        category: "BUSSID",
        seller: "BusMaster",
        price: 140000,
        image: "ets2_20240815_211333_00.png",
        downloads: 88
      },
      {
        id: 22,
        title: "American Locomotive",
        category: "TRAINZ",
        seller: "RailPro",
        price: 280000,
        image: "jwn.png",
        downloads: 35
      },
      {
        id: 23,
        title: "Setra sssMultiClass",
        category: "BUSSID",
        seller: "BusMaster",
        price: 140000,
        image: "ets2_20240815_211333_00.png",
        downloads: 88
      }
    ];

    const savedProducts = localStorage.getItem('warmodProducts');
    
    if (!savedProducts) {
      setAllProducts(defaultProducts);
      localStorage.setItem('warmodProducts', JSON.stringify(defaultProducts));
      console.log('Products loaded from default:', defaultProducts.length, 'products');
    } else {
      const parsedProducts = JSON.parse(savedProducts);
      
      const defaultProductIds = defaultProducts.map(p => p.id);
      const savedProductIds = parsedProducts.map(p => p.id);
      
      const newProducts = defaultProducts.filter(
        defaultProduct => !savedProductIds.includes(defaultProduct.id)
      );
      
      if (newProducts.length > 0) {
        const updatedProducts = [...parsedProducts, ...newProducts];
        setAllProducts(updatedProducts);
        localStorage.setItem('warmodProducts', JSON.stringify(updatedProducts));
        console.log('New products added:', newProducts.length, 'Total:', updatedProducts.length);
      } else {
        setAllProducts(parsedProducts);
        console.log('Products loaded from localStorage:', parsedProducts.length, 'products');
      }
    }
  };

  const filterAndPaginateProducts = () => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.seller.toLowerCase().includes(term)
      );
    }

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);

    setDisplayedProducts(currentProducts);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getTotalPages = () => {
    let filtered = allProducts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.seller.toLowerCase().includes(term)
      );
    }

    return Math.ceil(filtered.length / productsPerPage);
  };

  const totalPages = getTotalPages();

  const getPageNumbers = () => {
    if (totalPages <= 1) return [];
    
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const clearSearch = () => {
    window.location.reload();
  };

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Semua Produk WARMOD</h1>
          <p>Jelajahi koleksi lengkap addon premium untuk game kesayangan Anda</p>
          
          {searchTerm && (
            <div style={{ 
              marginTop: '15px', 
              padding: '10px 15px', 
              background: 'rgba(255, 255, 255, 0.95)', 
              borderRadius: '8px',
              display: 'inline-block',
              border: '2px solid #ff5722',
              boxShadow: '0 2px 10px rgba(255, 87, 34, 0.2)'
            }}>
              <span style={{ marginRight: '10px' }}><FaSearch/></span>
              Menampilkan hasil untuk: <strong style={{ color: '#ff5722' }}>"{searchTerm}"</strong>
              <button 
                onClick={clearSearch}
                style={{ 
                  marginLeft: '15px', 
                  background: 'none', 
                  border: 'none', 
                  color: '#666', 
                  cursor: 'pointer',
                  padding: '5px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
                title="Hapus pencarian"
              >
                ✕ Hapus
              </button>
            </div>
          )}
        </div>
      </section>

      <main className="container">
        <h2 className="section-title">
          {searchTerm ? `Hasil Pencarian: "${searchTerm}"` : 'Semua Addons'}
        </h2>
        
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
        
        <div style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
          Menampilkan {displayedProducts.length} dari {allProducts.filter(product => {
            let include = true;
            
            if (selectedCategory !== 'all') {
              include = include && (product.category === selectedCategory);
            }
            
            if (searchTerm) {
              const term = searchTerm.toLowerCase();
              include = include && (
                product.title.toLowerCase().includes(term) ||
                product.category.toLowerCase().includes(term) ||
                product.seller.toLowerCase().includes(term)
              );
            }
            
            return include;
          }).length} produk
          {selectedCategory !== 'all' && ` dalam kategori ${selectedCategory}`}
          {searchTerm && ` untuk "${searchTerm}"`}
        </div>
        
        <div className="products-grid">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {displayedProducts.length === 0 && (
          <div className="no-results">
            <i><FaSearch/></i>
            <h3>Tidak ada produk ditemukan</h3>
            <p>
              {searchTerm 
                ? `Tidak ada produk yang cocok dengan "${searchTerm}"`
                : 'Coba ubah filter kategori atau cari produk lain'
              }
            </p>
            <button 
              className="cta-button" 
              onClick={() => {
                setSelectedCategory('all');
                setCurrentPage(1);
                window.location.reload();
              }}
            >
              Tampilkan Semua Produk
            </button>
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <button 
              className="page-btn prev" 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹ Prev
            </button>
            
            {pageNumbers.map(pageNumber => (
              <button
                key={pageNumber}
                className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            
            <button 
              className="page-btn next" 
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next ›
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;