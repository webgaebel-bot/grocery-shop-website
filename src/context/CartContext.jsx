import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [couponCode, setCouponCode] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem(`cart_${user?.id || 'guest'}`);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, [user]);

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
    localStorage.setItem(`cart_${user?.id || 'guest'}`, JSON.stringify(cartItems));
  }, [cartItems, user]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        unit: product.unit,
        quantity,
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode(null);
    setDiscount(0);
  };

  const applyCoupon = (code) => {
    if (code === 'FRESH20') {
      setCouponCode(code);
      setDiscount(0.2);
      return { success: true, message: '20% discount applied!' };
    } else if (code === 'SAVE10') {
      setCouponCode(code);
      setDiscount(10);
      return { success: true, message: '$10 discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code' };
  };

  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getDiscountAmount = () => {
    const subtotal = getSubtotal();
    if (discount < 1) {
      return subtotal * discount;
    }
    return Math.min(discount, subtotal);
  };

  const getTotal = () => {
    return getSubtotal() - getDiscountAmount() + 5.99;
  };

  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    couponCode,
    discount,
    getSubtotal,
    getDiscountAmount,
    getTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
