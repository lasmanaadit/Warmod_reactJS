// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { FaBolt, FaCartPlus, FaDownload, FaClock } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState('ets2_20240816_171954_00.png');

  // Data produk sementara - nanti dari API berdasarkan ID
  const product = {
    id: 1,
    title: "EP3 Edit Jetbus 3 Pack",
    category: "BUSSID",
    seller: "Yellow Flash",
    price: 100000,
    images: [
      '/asssets/products/ets2_20240816_171954_00.png',
      'ets2_20240816_171521_00.png', 
      'ets2_20240816_171854_00.png',
      'ets2_20240815_211333_00.png'
    ],
    downloads: 156,
    lastUpdate: "1 minggu lalu",
    features: [
      "Texture high resolution",
      "Compatible dengan semua versi BUSSID", 
      "Easy installation",
      "Support update gratis",
      "Dokumentasi lengkap"
    ]
  };

  const handleAddToCart = () => {
    const productData = {
      title: product.title,
      category: product.category,
      seller: product.seller,
      price: product.price,
      image: product.images[0]
    };
    
    addToCart(productData);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect ke checkout
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 500);
  };

  return (
    <section className="product-detail">
      <div className="container">
        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={mainImage} alt={product.title} id="main-product-image" />
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${mainImage === image ? 'active' : ''}`}
                  onClick={() => setMainImage(image)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-detail">
            <div className="product-category">{product.category}</div>
            <h1 className="product-title-detail">{product.title}</h1>
            <div className="product-price-detail">Rp.{product.price.toLocaleString()}</div>
            <div className="product-rating">
              <span className="rating-text">{product.seller}</span>
            </div>

            <div className="product-actions">
              <button className="buy-now-btn" onClick={handleBuyNow}>
                <FaBolt/> Beli Sekarang
              </button>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <FaCartPlus/>Tambah ke Keranjang
              </button>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <FaDownload/>
                <span>{product.downloads} Unduhan</span>
              </div>
              <div className="meta-item">
                <FaClock/>
                <span>Update: {product.lastUpdate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="product-description">
          <h2>DESKRIPSI:</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vestibulum mi a tellus viverra
            aliquam. Curabitur suscipit sed ligula sed vestibulum. In hac habitasse platea dictumst. Cras
            feugiat nulla dolor, at malesuada est omare vel. Cras mattis porta tempus. In vitae metus id
            diam eleifend tincidunt. Praesent elementum in mauris ac ultricies. Aliquam erat volutpat.
          </p>
          <p>
            Etiam consectetur leo ac elit egestas dictum. Etiam lacus nisl, dapibus non laoreet at, vehicula
            eget mi. Quisque egestas ex non maximus commodo. Mauris ut varius tellus. Proin auctor a
            diam vel pharetra. Maecenas blandit ultricies ultricies. Donec porttitor feugiat elit ut convallis.
            Aliquam arcu neque, vestibulum eget aliquet non, luctus sed neque. Sed lobortis malesuada
            pretium. Praesent vel dapibus lacus, a sagittis nibh.
          </p>

        
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;