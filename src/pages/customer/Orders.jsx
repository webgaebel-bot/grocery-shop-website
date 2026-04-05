import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { orders } from '../../data/mockData';
import CustomerLayout from '../../components/layout/CustomerLayout';
import './Orders.css';

const Orders = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={20} />;
      case 'shipped':
        return <Truck size={20} />;
      case 'processing':
        return <Clock size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'delivered':
        return 'status-delivered';
      case 'shipped':
        return 'status-shipped';
      case 'processing':
        return 'status-processing';
      default:
        return 'status-pending';
    }
  };

  return (
    <CustomerLayout activeTab="orders">
      <div className="orders-page">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <Package size={64} />
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here</p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <span className="order-id">{order.id}</span>
                    <span className="order-date">Placed on {order.createdAt}</span>
                  </div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">Qty: {item.quantity}</span>
                      </div>
                      <span className="item-price">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-amount">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="order-actions">
                    <button className="btn btn-outline btn-sm">View Details</button>
                    {order.status === 'delivered' && (
                      <button className="btn btn-primary btn-sm">Reorder</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default Orders;
