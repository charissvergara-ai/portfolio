import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Pages.css';

const monthlyData = [
  { month: 'Jan', revenue: 4000, orders: 240, visitors: 12400 },
  { month: 'Feb', revenue: 3000, orders: 198, visitors: 10800 },
  { month: 'Mar', revenue: 5000, orders: 300, visitors: 15600 },
  { month: 'Apr', revenue: 4500, orders: 278, visitors: 14200 },
  { month: 'May', revenue: 6000, orders: 389, visitors: 18900 },
  { month: 'Jun', revenue: 5500, orders: 349, visitors: 17200 },
  { month: 'Jul', revenue: 7000, orders: 430, visitors: 21500 },
  { month: 'Aug', revenue: 6500, orders: 410, visitors: 19800 },
  { month: 'Sep', revenue: 8000, orders: 520, visitors: 24600 },
  { month: 'Oct', revenue: 7500, orders: 480, visitors: 22100 },
  { month: 'Nov', revenue: 9000, orders: 590, visitors: 28400 },
  { month: 'Dec', revenue: 10000, orders: 650, visitors: 32000 },
];

const weeklyData = [
  { day: 'Mon', sales: 1200, returns: 80 },
  { day: 'Tue', sales: 1800, returns: 120 },
  { day: 'Wed', sales: 1400, returns: 95 },
  { day: 'Thu', sales: 2200, returns: 150 },
  { day: 'Fri', sales: 2800, returns: 180 },
  { day: 'Sat', sales: 3200, returns: 200 },
  { day: 'Sun', sales: 2000, returns: 130 },
];

const analyticsStats = [
  { title: 'Total Revenue', value: '$128,430', change: '+12.5%', isPositive: true, icon: DollarSign },
  { title: 'Total Orders', value: '4,834', change: '+8.2%', isPositive: true, icon: ShoppingCart },
  { title: 'Total Visitors', value: '238,400', change: '+15.3%', isPositive: true, icon: Eye },
  { title: 'Conversion Rate', value: '2.03%', change: '-0.4%', isPositive: false, icon: Users },
];

function useChartColors() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return {
    grid: isDark ? '#334155' : '#e2e8f0',
    text: isDark ? '#94a3b8' : '#64748b',
    tooltipBg: isDark ? '#1e293b' : '#ffffff',
    tooltipBorder: isDark ? '#334155' : '#e2e8f0',
    tooltipText: isDark ? '#f8fafc' : '#1e293b',
  };
}

function Analytics() {
  const colors = useChartColors();

  const tooltipStyle = {
    backgroundColor: colors.tooltipBg,
    border: `1px solid ${colors.tooltipBorder}`,
    borderRadius: '8px',
    color: colors.tooltipText,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Analytics</h2>
          <p className="page-description">Detailed insights and performance metrics</p>
        </div>
        <select className="period-select">
          <option>Last 12 months</option>
          <option>Last 6 months</option>
          <option>Last 30 days</option>
          <option>Last 7 days</option>
        </select>
      </div>

      <div className="analytics-stats">
        {analyticsStats.map((stat, index) => (
          <div key={index} className="analytics-stat-card">
            <div className="stat-icon-wrapper">
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">{stat.title}</span>
              <span className="stat-value">{stat.value}</span>
              <span className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                {stat.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change} vs last period
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="chart-card large">
          <div className="chart-header">
            <h3>Revenue & Orders Overview</h3>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot blue"></span> Revenue</span>
              <span className="legend-item"><span className="dot green"></span> Orders</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOrd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis dataKey="month" stroke={colors.text} fontSize={12} />
              <YAxis yAxisId="left" stroke={colors.text} fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke={colors.text} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" />
              <Area yAxisId="right" type="monotone" dataKey="orders" stroke="#22c55e" fillOpacity={1} fill="url(#colorOrd)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-row two-cols">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Weekly Sales</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis dataKey="day" stroke={colors.text} fontSize={12} />
              <YAxis stroke={colors.text} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Visitor Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis dataKey="month" stroke={colors.text} fontSize={12} />
              <YAxis stroke={colors.text} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="visitors" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
