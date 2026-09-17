import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { success, error } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const result = login(formData.email, formData.password);
      
      if (result.success) {
        success('Welcome back!');
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        error(result.message);
      }
    } catch (err) {
      error('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Demo credentials helper
  const fillDemoCredentials = (type) => {
    if (type === 'admin') {
      setFormData({ email: 'admin@freshcart.com', password: 'admin123' });
    } else {
      setFormData({ email: 'john@example.com', password: 'customer123' });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Form */}
        <div className="auth-form-section">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <ShoppingBag size={32} />
              <span>FreshCart</span>
            </Link>
            <h1>Welcome back!</h1>
            <p>Sign in to your account to continue shopping</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className={`form-group ${errors.email ? 'error' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className={`form-group ${errors.password ? 'error' : ''}`}>
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <Lock size={20} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="demo-credentials">
            <p>Demo Accounts (Click to fill):</p>
            <div className="demo-buttons">
              <button 
                type="button" 
                className="demo-btn"
                onClick={() => fillDemoCredentials('admin')}
              >
                Admin Account
              </button>
              <button 
                type="button" 
                className="demo-btn"
                onClick={() => fillDemoCredentials('customer')}
              >
                Customer Account
              </button>
            </div>
          </div>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Create one now
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="auth-image-section">
          <div className="auth-image-content">
            <h2>Fresh Groceries Delivered</h2>
            <p>Join thousands of happy customers shopping for fresh produce</p>
            <div className="auth-stats">
              <div className="stat">
                <span className="stat-value">15K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-value">10K+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-value">2hr</span>
                <span className="stat-label">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
