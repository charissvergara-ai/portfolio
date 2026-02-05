import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import './Pages.css';

const ordersData = [
  { id: '#ORD-001', customer: 'Olivia Martin', date: '2024-01-15', items: 3, total: '$316.00', status: 'Delivered' },
  { id: '#ORD-002', customer: 'Ava Johnson', date: '2024-01-15', items: 2, total: '$242.00', status: 'Pending' },
  { id: '#ORD-003', customer: 'Michael Chen', date: '2024-01-14', items: 5, total: '$837.00', status: 'Shipped' },
  { id: '#ORD-004', customer: 'Lisa Anderson', date: '2024-01-14', items: 1, total: '$529.00', status: 'Processing' },
  { id: '#ORD-005', customer: 'James Wilson', date: '2024-01-13', items: 4, total: '$163.00', status: 'Delivered' },
  { id: '#ORD-006', customer: 'Emma Davis', date: '2024-01-13', items: 2, total: '$445.00', status: 'Shipped' },
  { id: '#ORD-007', customer: 'William Brown', date: '2024-01-12', items: 6, total: '$892.00', status: 'Delivered' },
  { id: '#ORD-008', customer: 'Sophia Miller', date: '2024-01-12', items: 1, total: '$120.00', status: 'Cancelled' },
  { id: '#ORD-009', customer: 'Daniel Lee', date: '2024-01-11', items: 3, total: '$678.00', status: 'Pending' },
  { id: '#ORD-010', customer: 'Grace Taylor', date: '2024-01-11', items: 2, total: '$234.00', status: 'Processing' },
];

const statusIcons = {
  Delivered: CheckCircle,
  Shipped: Truck,
  Processing: Package,
  Pending: Clock,
  Cancelled: Clock,
};

function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'status-completed';
      case 'shipped': return 'status-shipped';
      case 'processing': return 'status-processing';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Orders</h2>
          <p className="page-description">Track and manage customer orders</p>
        </div>
        <button className="primary-button">Create Order</button>
      </div>

      <div className="stats-row">
        <div className="mini-stat">
          <span className="mini-stat-value">156</span>
          <span className="mini-stat-label">Total Orders</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value">23</span>
          <span className="mini-stat-label">Pending</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value">12</span>
          <span className="mini-stat-label">Processing</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value">8</span>
          <span className="mini-stat-label">Shipped</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="search-filter">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search orders..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="status-tabs">
              {statuses.map(status => (
                <button
                  key={status}
                  className={`status-tab ${statusFilter === status ? 'active' : ''}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="table-wrapper">
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
              {filteredOrders.map((order) => {
                const StatusIcon = statusIcons[order.status] || Clock;
                return (
                  <tr key={order.id}>
                    <td className="order-id">{order.id}</td>
                    <td>{order.customer}</td>
                    <td className="date">{order.date}</td>
                    <td>{order.items} items</td>
                    <td className="amount">{order.total}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(order.status)}`}>
                        <StatusIcon size={14} />
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-button">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
