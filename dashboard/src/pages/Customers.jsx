import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Mail, Phone } from 'lucide-react';
import './Pages.css';

const customersData = [
  { id: 1, name: 'Olivia Martin', email: 'olivia@email.com', phone: '+1 234 567 890', status: 'Active', orders: 12, spent: '$2,450' },
  { id: 2, name: 'Ava Johnson', email: 'ava@email.com', phone: '+1 234 567 891', status: 'Active', orders: 8, spent: '$1,890' },
  { id: 3, name: 'Michael Chen', email: 'michael@email.com', phone: '+1 234 567 892', status: 'Inactive', orders: 24, spent: '$5,670' },
  { id: 4, name: 'Lisa Anderson', email: 'lisa@email.com', phone: '+1 234 567 893', status: 'Active', orders: 15, spent: '$3,240' },
  { id: 5, name: 'James Wilson', email: 'james@email.com', phone: '+1 234 567 894', status: 'Active', orders: 6, spent: '$980' },
  { id: 6, name: 'Emma Davis', email: 'emma@email.com', phone: '+1 234 567 895', status: 'Pending', orders: 3, spent: '$450' },
  { id: 7, name: 'William Brown', email: 'william@email.com', phone: '+1 234 567 896', status: 'Active', orders: 19, spent: '$4,120' },
  { id: 8, name: 'Sophia Miller', email: 'sophia@email.com', phone: '+1 234 567 897', status: 'Inactive', orders: 2, spent: '$320' },
];

function Customers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Customers</h2>
          <p className="page-description">Manage your customer database</p>
        </div>
        <button className="primary-button">Add Customer</button>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="search-filter">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search customers..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="filter-button">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Status</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-cell">
                      <div className="avatar">{customer.name.charAt(0)}</div>
                      <div className="customer-details">
                        <span className="customer-name">{customer.name}</span>
                        <div className="customer-contact">
                          <span><Mail size={12} /> {customer.email}</span>
                          <span><Phone size={12} /> {customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>{customer.orders}</td>
                  <td className="amount">{customer.spent}</td>
                  <td>
                    <button className="action-button">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;
