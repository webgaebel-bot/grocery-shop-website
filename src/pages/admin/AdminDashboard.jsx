import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Users, ShoppingCart, BarChart3, Settings, 
  LogOut, Menu, X, ChevronRight, TrendingUp, DollarSign, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { products, orders, users, stats } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const StatCard = ({ title, value, icon: IconComponent, trend, trendUp }) => (
    <div className="stat-card">
      <div className="stat-icon">
        <IconComponent size={24} />
      </div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
        {trend && (
          <span className={`trend ${trendUp ? 'up' : 'down'}`}>
            <TrendingUp size={14} />
            {trend}
          </span>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            {/* Stats */}
            <div className="stats-grid">
              <StatCard 
                title="Total Revenue" 
                value={`$${stats.totalRevenue.toLocaleString()}`}
                icon={DollarSign}
                trend="+12.5%"
                trendUp={true}
              />
              <StatCard 
                title="Total Orders" 
                value={stats.totalOrders.toLocaleString()}
                icon={ShoppingCart}
                trend="+8.2%"
                trendUp={true}
              />
              <StatCard 
                title="Total Customers" 
                value={stats.totalCustomers.toLocaleString()}
                icon={Users}
                trend="+15.3%"
                trendUp={true}
              />
              <StatCard 
                title="Low Stock Items" 
                value={stats.lowStockProducts}
                icon={AlertCircle}
                trend="Needs attention"
                trendUp={false}
              />
            </div>

            {/* Charts */}
            <div className="chart-section">
              <div className="chart-card">
                <h3>Monthly Sales</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#2E7D32" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="recent-section">
              <div className="section-header">
                <h3>Recent Orders</h3>
                <button onClick={() => setActiveTab('orders')} className="view-all">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>User #{order.userId}</td>
                        <td>{order.createdAt}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>
                          <span className={`badge badge-${order.status}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock Products */}
            <div className="recent-section">
              <div className="section-header">
                <h3>Low Stock Products</h3>
                <button onClick={() => setActiveTab('products')} className="view-all">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter(p => p.stock < 100)
                      .slice(0, 5)
                      .map(product => (
                        <tr key={product.id}>
                          <td>
                            <div className="product-cell">
                              <img src={product.image} alt={product.name} />
                              <span>{product.name}</span>
                            </div>
                          </td>
                          <td>{product.category}</td>
                          <td>{product.stock}</td>
                          <td>
                            <span className={`badge ${product.stock < 50 ? 'badge-error' : 'badge-warning'}`}>
                              {product.stock < 50 ? 'Critical' : 'Low Stock'}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="dashboard-content">
            <div className="section-header">
              <h2>Products</h2>
              <button className="btn btn-primary">Add Product</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-cell">
                          <img src={product.image} alt={product.name} />
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>
                        <span className={`badge ${product.stock > 0 ? 'badge-success' : 'badge-error'}`}>
                          {product.stock > 0 ? 'Active' : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn">Edit</button>
                        <button className="action-btn delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="dashboard-content">
            <div className="section-header">
              <h2>Orders</h2>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>User #{order.userId}</td>
                      <td>{order.createdAt}</td>
                      <td>{order.items.length} items</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <span className={`badge badge-${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="dashboard-content">
            <div className="section-header">
              <h2>Customers</h2>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.role === 'customer').map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="product-cell">
                          <img src={user.avatar} alt={user.name} />
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.createdAt}</td>
                      <td>
                        <button className="action-btn">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return <div className="dashboard-content"><h2>Coming Soon</h2></div>;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="logo">FreshCart Admin</span>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="logo">
            <span>🛒</span>
            <span>FreshCart Admin</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="admin-main-content">
        <div className="content-header">
          <h1>{menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}</h1>
          <div className="header-actions">
            <span className="admin-badge">Admin</span>
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
