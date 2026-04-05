import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ShoppingBag, ArrowRight, 
  Truck, Shield, Clock, Gift, Tag, AlertCircle 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getSubtotal, 
    getTotal, 
    getDiscountAmount,
    applyCoupon,
    couponCode,
    clearCart 
  } = useCart();
  const { success, error } = useToast();
  
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemove(productId);
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    success('Item removed from cart');
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setIsApplying(true);
    
    const result = applyCoupon(promoCode.toUpperCase());
    
    if (result.success) {
      success(result.message);
    } else {
      error(result.message);
    }
    
    setIsApplying(false);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = 5.99;
  const total = getTotal();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={64} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Start Shopping
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart ({cartItems.length} items)</h1>
        
        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="cart-header">
              <span className="product-col">Product</span>
              <span className="price-col">Price</span>
              <span className="quantity-col">Quantity</span>
              <span className="total-col">Total</span>
              <span className="action-col"></span>
            </div>

            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.productId} className="cart-item">
                  <div className="product-col">
                    <Link to={`/products/${item.productId}`} className="cart-product">
                      <img src={item.image} alt={item.name} />
                      <div className="product-info">
                        <h3>{item.name}</h3>
                        <span className="product-unit">{item.unit}</span>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="price-col">
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="quantity-col">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="qty-btn"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="qty-btn"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="total-col">
                    <span className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="action-col">
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemove(item.productId)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <Link to="/products" className="btn btn-outline continue-shopping">
                <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
                Continue Shopping
              </Link>
              <button 
                className="btn btn-danger clear-cart-btn"
                onClick={() => {
                  clearCart();
                  success('Cart cleared');
                }}
              >
                <Trash2 size={16} />
                Clear Cart
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            {/* Promo Code */}
            <div className="promo-section">
              <form onSubmit={handleApplyPromo}>
                <div className="promo-input-group">
                  <Tag size={18} className="promo-icon" />
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-input"
                  />
                  <button 
                    type="submit" 
                    className="btn btn-secondary btn-sm"
                    disabled={!promoCode || isApplying}
                  >
                    Apply
                  </button>
                </div>
              </form>
              {couponCode && (
                <div className="applied-coupon">
                  <Gift size={16} />
                  <span>Code <strong>{couponCode}</strong> applied!</span>
                </div>
              )}
            </div>

            {/* Calculation */}
            <div className="summary-calculation">
              <div className="calc-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="calc-row discount">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="calc-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="calc-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              className="btn btn-primary btn-lg checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>

            {/* Features */}
            <div className="cart-features">
              <div className="cart-feature">
                <Truck size={20} />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="cart-feature">
                <Shield size={20} />
                <span>Secure checkout</span>
              </div>
              <div className="cart-feature">
                <Clock size={20} />
                <span>2-hour delivery available</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="delivery-info">
              <div className="info-item">
                <AlertCircle size={16} />
                <span>Delivery estimate: 2-4 business days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
