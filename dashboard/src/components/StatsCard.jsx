import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatsCard.css';

function StatsCard({ title, value, change, isPositive }) {
  return (
    <div className="stats-card">
      <div className="stats-header">
        <span className="stats-title">{title}</span>
        <span className={`stats-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {change}
        </span>
      </div>
      <div className="stats-value">{value}</div>
    </div>
  );
}

export default StatsCard;
