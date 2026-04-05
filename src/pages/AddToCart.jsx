import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Check, ShoppingCart, ArrowRight, Plus, Minus, Heart, Share2, Truck, Shield, Clock } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/common/ProductCard';
import './AddToCart.css';

const AddToCart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { success } = useToast();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showSuccess, setShowSuccess] = useState(true);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      // Add to cart automatically
      addToCart(foundProduct, quantity);
      
      // Get related products from same category
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
      
      // Show success toast
      success(`${foundProduct.name} added to cart!`);
    }
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQty = quantity + change;
    if (newQty >= 1 && newQty <= 10) {
      setQuantity(newQty);
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  if (!product) {
    return (
      <div className="add-to-cart-page">
        <div className="container">
          <div className="loading-state">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="add-to-cart-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
          <span>/</span>
          <span className="active">Added to Cart</span>
        </div>

        {/* Success Message */}
        <div className="add-to-cart-success">
          <div className="success-icon">
            <Check size={40} />
          </div>
          <h1>Added to Cart!</h1>
          <p className="success-message">
            <strong>{product.name}</strong> has been successfully added to your cart.
          </p>
        </div>

        {/* Product Summary */}
        <div className="add-to-cart-content">
          <div className="product-summary-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              {product.discount > 0 && (
                <span className="discount-badge">-{product.discount}%</span>
              )}
            </div>
            
            <div className="product-details">
              <span className="product-category">{product.category}</span>
              <h2 className="product-name">{product.name}</h2>
              
              <div className="product-pricing">
                <span className="current-price">${product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="quantity-section">
                <label>Quantity:</label>
                <div className="quantity-selector">
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="btn btn-primary btn-lg" onClick={handleViewCart}>
                  <ShoppingCart size={20} />
                  View Cart
                  <ArrowRight size={20} />
                </button>
                <button className="btn btn-outline btn-lg" onClick={handleContinueShopping}>
                  Continue Shopping
                </button>
              </div>

              {/* Extra Actions */}
              <div className="extra-actions">
                <button className="action-btn">
                  <Heart size={18} />
                  Add to Wishlist
                </button>
                <button className="action-btn">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="trust-badge">
              <Truck size={24} />
              <div>
                <strong>Free Delivery</strong>
                <span>On orders over $50</span>
              </div>
            </div>
            <div className="trust-badge">
              <Shield size={24} />
              <div>
                <strong>Secure Payment</strong>
                <span>100% secure checkout</span>
              </div>
            </div>
            <div className="trust-badge">
              <Clock size={24} />
              <div>
                <strong>Fast Delivery</strong>
                <span>2-3 business days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="section-title">You May Also Like</h2>
            <p className="section-subtitle">More products from {product.category}</p>
            <div className="related-products-grid">
              {relatedProducts.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}

        {/* Cart Summary Preview */}
        <div className="cart-summary-preview">
          <div className="summary-content">
            <h3>Cart Summary</h3>
            <div className="summary-row">
              <span>Items in Cart:</span>
              <span>{quantity}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${(product.price * quantity).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(product.price * quantity).toFixed(2)}</span>
            </div>
            <button className="btn btn-primary btn-lg checkout-btn" onClick={handleViewCart}>
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
