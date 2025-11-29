// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { FaBolt, FaCartPlus, FaDownload, FaClock, FaTag } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Data produk lengkap
  useEffect(() => {
    const products = [
      {
        id: 1,
        title: "UD Quester 1.56 Dengan fitur lengkap serta sound yang sangat realistic",
        category: "ETS2",
        seller: "WARMOD", 
        price: 100000,
        originalPrice: 100000,
        discount: 50,
        discountEndDate: "2024-12-31",
        image: "/images/products/ets2_20240816_171521_00.png",
        images: [
          "/images/products/ets2_20240328_230103_00.png",
          "/images/products/ets2_20240328_214843_00.png",
        ],
        downloads: 192,
        lastUpdate: "1 minggu lalu",
        // HAPUS features
        description: "UD Quester 1.56 dengan kualitas premium sekarang tersedia dengan diskon spesial 50%. Dapatkan addon terbaik ini sebelum promo berakhir! Addon ini memberikan pengalaman gaming ETS2 yang lebih realistis dengan texture berkualitas tinggi dan kompatibilitas yang luas."
      },
      {
        id: 2,
        title: "EP3 Edit Jetbus 3 Pack",
        category: "BUSSID",
        seller: "Yellow Flash",
        price: 100000,
        originalPrice: 100000,
        discount: 0,
        discountEndDate: null,
        image: "/images/products/ets2_20240816_171521_00.png",
        images: [
          "/images/products/ets2_20240816_171854_00.png",
          "/images/products/ets2_20240819_100321_00.png",
          "/images/products/ets2_20230808_135052_00.png",
          "/images/products/ets2_20240815_175736_00.png",
        ],
        downloads: 156,
        lastUpdate: "2 hari lalu",
        // HAPUS features  
        description: "EP3 Edit Jetbus 3 Pack dengan desain terbaru dan kualitas terbaik untuk pengalaman gaming BUSSID yang lebih menyenangkan. Pack ini termasuk 3 varian bus dengan warna dan spesifikasi yang berbeda-beda."
      },
      {
        id: 3,
        title: "LOCOPACK",
        category: "TRAINZ",
        seller: "Digirails",
        price: 100000,
        originalPrice: 100000,
        discount: 25,
        discountEndDate: null,
        image: "/images/products/locopack.jpg",
        images: [
          "/images/products/locopack.jpg",
          "/images/products/cc206..jpg",
          "/images/products/2023-04-08 220705.jpg",
          "/images/products/2023-02-17 193212.jpg",
        ],
        downloads: 156,
        lastUpdate: "2 hari lalu",
        // HAPUS features  
        description: "EP3 Edit Jetbus 3 Pack dengan desain terbaru dan kualitas terbaik untuk pengalaman gaming BUSSID yang lebih menyenangkan. Pack ini termasuk 3 varian bus dengan warna dan spesifikasi yang berbeda-beda."
      },
      {
        id: 4,
        title: "OLD Setra",
        category: "BUSSID",
        seller: "Bimo",
        price: 0,
        originalPrice: 0,
        discount: 0,
        discountEndDate: null,
        image: "/images/products/jwn.png",
        images: [
          "/images/products/ets2_20250803_192917_00.png",
          "/images/products/ets2_20240914_164037_00.png",
          "/images/products/ets2_20240914_164122_00.png",
        ],
        downloads: 156,
        lastUpdate: "2 hari lalu",
        // HAPUS features  
        description: "EP3 Edit Jetbus 3 Pack dengan desain terbaru dan kualitas terbaik untuk pengalaman gaming BUSSID yang lebih menyenangkan. Pack ini termasuk 3 varian bus dengan warna dan spesifikasi yang berbeda-beda."
      }
    ];
    

    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    
    if (foundProduct) {
      const productImages = foundProduct.images || [foundProduct.image].filter(Boolean);
      if (productImages.length > 0) {
        setMainImage(productImages[0]);
      }
    }
    
    setLoading(false);
  }, [id]);

  const getDaysRemaining = (dateString) => {
    if (!dateString) return 0;
    const now = new Date();
    const endDate = new Date(dateString);
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleAddToCart = async () => {
    if (addingToCart || !product) return;
    
    setAddingToCart(true);
    
    const productData = {
      title: product.title,
      category: product.category,
      seller: product.seller,
      price: product.discount > 0 ? Math.round(product.price * (1 - product.discount / 100)) : product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image || (product.images && product.images[0]) || '',
      productId: product.id
    };
    
    try {
      await addToCart(productData);
      setTimeout(() => {
        setAddingToCart(false);
      }, 500);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 1000);
  };

  // Format description dengan bold
  const formatDescription = (desc) => {
    return desc.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index}><strong>{line.replace(/\*\*/g, '')}</strong></p>;
      }
      return <p key={index}>{line}</p>;
    });
  };

  if (loading) {
    return (
      <section className="product-detail">
        <div className="container">
          <div className="loading">Loading product...</div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="product-detail">
        <div className="container">
          <div className="error-message">Product not found</div>
        </div>
      </section>
    );
  }

  const hasDiscount = product.discount > 0;
  const finalPrice = hasDiscount ? Math.round(product.price * (1 - product.discount / 100)) : product.price;
  const daysRemaining = getDaysRemaining(product.discountEndDate);
  const productImages = product.images || [product.image].filter(Boolean);

  return (
    <section className="product-detail">
      <div className="container">
        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={mainImage} alt={product.title} />
            </div>
            {productImages.length > 1 && (
              <div className="image-thumbnails">
                {productImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${mainImage === image ? 'active' : ''}`}
                    onClick={() => setMainImage(image)}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info-detail">
            <div className="product-header">
              <div className="product-category">{product.category}</div>
              {hasDiscount && (
                <div className="product-discount-badge">
                  <FaTag />
                  <span>DISKON {product.discount}%</span>
                </div>
              )}
            </div>
            
            <h1 className="product-title-detail">{product.title}</h1>
            
            {/* Pricing Section */}
              <div className={`product-pricing-detail ${hasDiscount ? 'with-discount' : 'normal'}`}>
                {hasDiscount ? (
                  <>
                    <div className="price-original-detail">
                      <span className="original-price">Rp {product.originalPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="price-final-detail">
                      {finalPrice === 0 ? (
                        <span className="free-price-detail">FREE</span>
                      ) : (
                        <span className="final-price-detail">Rp {finalPrice.toLocaleString('id-ID')}</span>
                      )}
                    </div>
                    {/* discount timer tetap */}
                  </>
                ) : (
                  <div className="price-normal-detail">
                    {product.price === 0 ? (
                      <span className="free-price-detail">FREE</span>
                    ) : (
                      <span className="normal-price">Rp {product.price.toLocaleString('id-ID')}</span>
                    )}
                  </div>
                )}
              </div>

            <div className="product-seller">
              <span>Seller: <strong>{product.seller}</strong></span>
            </div>

            <div className="product-meta-detail">
              <div className="meta-item">
                <FaDownload/>
                <span><strong>{product.downloads}</strong> Unduhan</span>
              </div>
              <div className="meta-item">
                <FaClock/>
                <span>Update: <strong>{product.lastUpdate}</strong></span>
              </div>
            </div>

            <div className="product-actions">
              <button className="buy-now-btn" onClick={handleBuyNow} disabled={addingToCart}>
                <FaBolt/> {addingToCart ? 'Menambah...' : 'Beli Sekarang'}
              </button>
              <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={addingToCart}>
                <FaCartPlus/> {addingToCart ? 'Menambah...' : 'Tambah ke Keranjang'}
              </button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="product-description-section">
            <h2>Deskripsi Produk</h2>
            <div className="description-content">
              {product && (
                <>
                  <p><strong>{product.title}</strong></p>
                  <p>{product.description}</p>
                </>
              )}
            </div>
          </div>
      </div>
    </section>
  );
};

export default ProductDetail;