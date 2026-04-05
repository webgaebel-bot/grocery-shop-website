import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AddToCart from './pages/AddToCart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// Customer Pages
import Profile from './pages/customer/Profile';
import Orders from './pages/customer/Orders';
import Wishlist from './pages/customer/Wishlist';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <div className="app">
              <Header />
              <main className="site-main">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/add-to-cart/:id" element={<AddToCart />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/terms" element={<Terms />} />
                  
                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected Customer Routes */}
                  <Route path="/customer/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/customer/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                  <Route path="/customer/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                  
                  {/* Customer Cart - Public */}
                  <Route path="/customer/cart" element={<Cart />} />
                  
                  {/* Protected Checkout */}
                  <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  
                  {/* Protected Admin Routes */}
                  <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
                  
                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
