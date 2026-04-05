import { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const token = btoa(JSON.stringify({ id: foundUser.id, role: foundUser.role }));
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
      return { success: true, user: foundUser };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (userData) => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Email already exists' };
    }
    
    const newUser = {
      id: users.length + 1,
      ...userData,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    users.push(newUser);
    const token = btoa(JSON.stringify({ id: newUser.id, role: newUser.role }));
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return { success: true };
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
