import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, CreditCard, Truck, MapPin, Check, 
  Shield, Lock, ArrowLeft, Package 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getSubtotal, getTotal, getDiscountAmount, clearCart } = useCart();
  const { user } = useAuth();
  const { success, error } = useToast();
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zip: user?.address?.zip || ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  
  const [shippingMethod, setShippingMethod] = useState('standard');

  if (cartItems.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  const shippingCosts = {
    standard: 5.99,
    express: 9.99,
    sameDay: 14.99
  };

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = shippingCosts[shippingMethod];
  const total = subtotal - discount + shipping;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
    success('Order placed successfully!');
  };

  if (orderComplete) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-complete">
            <div className="success-icon">
              <Check size={64} />
            </div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your order. We've sent a confirmation email to {shippingInfo.email}</p>
            <div className="order-details">
              <div className="detail-row">
                <span>Order Number</span>
                <strong>ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong>
              </div>
              <div className="detail-row">
                <span>Total Amount</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>
            <div className="complete-actions">
              <Link to="/customer/orders" className="btn btn-primary btn-lg">
                View My Orders
              </Link>
              <Link to="/products" className="btn btn-outline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="checkout-breadcrumb">
          <Link to="/cart">
            <ArrowLeft size={16} />
            Back to Cart
          </Link>
        </div>

        <h1 className="page-title">Checkout</h1>

        {/* Steps */}
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">
              {step > 1 ? <Check size={16} /> : '1'}
            </div>
            <span>Shipping</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">
              {step > 2 ? <Check size={16} /> : '2'}
            </div>
            <span>Payment</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Confirmation</span>
          </div>
        </div>

        <div className="checkout-layout">
          {/* Main Content */}
          <div className="checkout-main">
            {step === 1 && (
              <div className="checkout-section">
                <h2>Shipping Information</h2>
                <form onSubmit={handleShippingSubmit} className="checkout-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address *</label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>ZIP Code *</label>
                      <input
                        type="text"
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="shipping-methods">
                    <h3>Shipping Method</h3>
                    <label className={`shipping-option ${shippingMethod === 'standard' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                      />
                      <div className="option-content">
                        <div className="option-icon">
                          <Truck size={24} />
                        </div>
                        <div className="option-details">
                          <span className="option-name">Standard Delivery</span>
                          <span className="option-time">3-5 business days</span>
                        </div>
                        <span className="option-price">$5.99</span>
                      </div>
                    </label>

                    <label className={`shipping-option ${shippingMethod === 'express' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                      />
                      <div className="option-content">
                        <div className="option-icon express">
                          <Package size={24} />
                        </div>
                        <div className="option-details">
                          <span className="option-name">Express Delivery</span>
                          <span className="option-time">1-2 business days</span>
                        </div>
                        <span className="option-price">$9.99</span>
                      </div>
                    </label>

                    <label className={`shipping-option ${shippingMethod === 'sameDay' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="shipping"
                        value="sameDay"
                        checked={shippingMethod === 'sameDay'}
                        onChange={(e) => setShippingMethod(e.target.value)}
                      />
                      <div className="option-content">
                        <div className="option-icon same-day">
                          <MapPin size={24} />
                        </div>
                        <div className="option-details">
                          <span className="option-name">Same Day Delivery</span>
                          <span className="option-time">Order before 2 PM</span>
                        </div>
                        <span className="option-price">$14.99</span>
                      </div>
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg continue-btn">
                    Continue to Payment
                    <ChevronRight size={20} />
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-section">
                <h2>Payment Information</h2>
                <form onSubmit={handlePaymentSubmit} className="checkout-form">
                  <div className="payment-methods">
                    <label className="payment-option selected">
                      <input type="radio" name="payment" defaultChecked />
                      <CreditCard size={24} />
                      <span>Credit / Debit Card</span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label>Card Number *</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name *</label>
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date *</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentInfo.expiry}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="payment-security">
                    <div className="security-item">
                      <Lock size={16} />
                      <span>Secure SSL Encryption</span>
                    </div>
                    <div className="security-item">
                      <Shield size={16} />
                      <span>Your information is protected</span>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="btn btn-outline back-btn"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft size={16} />
                      Back to Shipping
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg place-order-btn"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="loading-spinner"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          Place Order
                          <ChevronRight size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.productId} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
