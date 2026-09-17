import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, 
  ChevronRight, Plus, Minus, Check, Package 
} from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/common/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { success } = useToast();
  
  const foundProduct = products.find(p => p.id === parseInt(id));
  
  useEffect(() => {
    if (!foundProduct) {
      navigate('/products');
    }
  }, [foundProduct, navigate]);

  const product = foundProduct;
  const relatedProducts = foundProduct 
    ? products.filter(p => p.category === foundProduct.category && p.id !== foundProduct.id).slice(0, 4)
    : [];

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(q => q + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const calculateDiscount = () => {
    if (product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return product.discount || 0;
  };

  if (!product) return null;

  const discount = calculateDiscount();
  const productImages = [
    product.image,
    `https://images.unsplash.com/photo-1619566636853-4df0c5205f3f?w=600`,
    `https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600`,
    `https://images.unsplash.com/photo-1542838132-92c53300491e?w=600`
  ];

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={16} />
          <Link to="/products">Products</Link>
          <ChevronRight size={16} />
          <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
            {product.category}
          </Link>
          <ChevronRight size={16} />
          <span className="active">{product.name}</span>
        </div>

        {/* Product Info */}
        <div className="product-detail-grid">
          {/* Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={productImages[selectedImage]} alt={product.name} />
              {discount > 0 && (
                <span className="detail-discount-badge">-{discount}%</span>
              )}
            </div>
            <div className="thumbnail-grid">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="product-info">
            <div className="product-meta">
              <span className="product-category-tag">{product.category}</span>
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.rating) ? "#FFD700" : "transparent"}
                      stroke={i < Math.floor(product.rating) ? "#FFD700" : "#CBD5E0"}
                    />
                  ))}
                </div>
                <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-pricing-detail">
              <span className="current-price">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
              )}
              <span className="price-unit">/ {product.unit}</span>
              {discount > 0 && (
                <span className="save-badge">Save {discount}%</span>
              )}
            </div>

            <p className="product-short-desc">{product.description}</p>

            {/* Features */}
            <div className="product-features">
              <div className="feature-item">
                <Truck size={20} />
                <span>Free delivery on orders over $50</span>
              </div>
              <div className="feature-item">
                <Shield size={20} />
                <span>Quality guarantee</span>
              </div>
              <div className="feature-item">
                <RotateCcw size={20} />
                <span>Easy returns within 7 days</span>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="product-actions">
              <div className="quantity-selector">
                <span className="qty-label">Quantity:</span>
                <div className="qty-controls">
                  <button 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="stock-info">
                  {product.stock > 0 ? (
                    <><Check size={14} /> {product.stock} in stock</>
                  ) : (
                    'Out of stock'
                  )}
                </span>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn btn-primary btn-lg add-cart-btn"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button 
                  className={`btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={handleWishlist}
                >
                  <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
                <button className="btn share-btn">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="product-details-list">
              <div className="detail-item">
                <span className="detail-label">SKU:</span>
                <span className="detail-value">FRESH-{product.id.toString().padStart(4, '0')}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{product.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Unit:</span>
                <span className="detail-value">{product.unit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="product-tabs">
          <div className="tabs-header">
            <button 
              className={activeTab === 'description' ? 'active' : ''}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={activeTab === 'reviews' ? 'active' : ''}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews})
            </button>
            <button 
              className={activeTab === 'shipping' ? 'active' : ''}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping Info
            </button>
          </div>
          
          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <p>
                  Our {product.name} is sourced from the finest suppliers to ensure you get 
                  the best quality. Perfect for your daily needs, this product is:
                </p>
                <ul className="benefits-list">
                  <li>Fresh and high quality</li>
                  <li>Carefully selected and packed</li>
                  <li>Delivered with care</li>
                  <li>Best value for money</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <h3>Customer Reviews</h3>
                <div className="reviews-summary">
                  <div className="average-rating">
                    <span className="big-rating">{product.rating}</span>
                    <div className="rating-bar">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={24}
                          fill={i < Math.floor(product.rating) ? "#FFD700" : "transparent"}
                          stroke={i < Math.floor(product.rating) ? "#FFD700" : "#CBD5E0"}
                        />
                      ))}
                    </div>
                    <span>Based on {product.reviews} reviews</span>
                  </div>
                </div>
                <div className="review-item">
                  <div className="review-header">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" 
                      alt="Reviewer" 
                    />
                    <div>
                      <h4>John Smith</h4>
                      <div className="review-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="#FFD700" stroke="#FFD700" />
                        ))}
                      </div>
                    </div>
                    <span className="review-date">2 days ago</span>
                  </div>
                  <p>Great quality! Fresh and exactly as described. Will definitely buy again.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div className="tab-panel">
                <h3>Shipping Information</h3>
                <div className="shipping-info">
                  <div className="shipping-option">
                    <Package size={32} />
                    <div>
                      <h4>Standard Delivery</h4>
                      <p>3-5 business days - $5.99 (Free over $50)</p>
                    </div>
                  </div>
                  <div className="shipping-option">
                    <Truck size={32} />
                    <div>
                      <h4>Express Delivery</h4>
                      <p>1-2 business days - $9.99</p>
                    </div>
                  </div>
                  <div className="shipping-option">
                    <Check size={32} />
                    <div>
                      <h4>Same Day Delivery</h4>
                      <p>Order before 2 PM - $14.99</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="section-title">Related Products</h2>
            <div className="products-grid">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
