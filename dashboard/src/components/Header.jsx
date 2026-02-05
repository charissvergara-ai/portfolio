import { useLocation } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import './Header.css';

const pageInfo = {
  '/': { title: 'Dashboard', subtitle: "Welcome back, here's what's happening today." },
  '/customers': { title: 'Customers', subtitle: 'Manage your customer database' },
  '/orders': { title: 'Orders', subtitle: 'Track and manage customer orders' },
  '/analytics': { title: 'Analytics', subtitle: 'Detailed insights and performance metrics' },
  '/settings': { title: 'Settings', subtitle: 'Manage your account preferences' },
};

function Header() {
  const location = useLocation();
  const { title, subtitle } = pageInfo[location.pathname] || pageInfo['/'];

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      <div className="header-right">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <button className="icon-button notification-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <div className="user-avatar">
          <User size={20} />
        </div>
      </div>
    </header>
  );
}

export default Header;
