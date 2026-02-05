import './RecentOrders.css';

function RecentOrders({ orders }) {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      default:
        return '';
    }
  };

  return (
    <div className="orders-card">
      <div className="orders-header">
        <h3 className="orders-title">Recent Orders</h3>
        <a href="#" className="view-all">View all</a>
      </div>
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">{order.id}</td>
                <td>
                  <div className="customer-info">
                    <span className="customer-name">{order.customer}</span>
                    <span className="customer-email">{order.email}</span>
                  </div>
                </td>
                <td className="order-amount">{order.amount}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;
