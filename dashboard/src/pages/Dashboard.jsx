import StatsCard from '../components/StatsCard';
import { RevenueChart, TrafficChart } from '../components/Charts';
import RecentOrders from '../components/RecentOrders';
import { revenueData, trafficData, recentOrders, statsData } from '../data/dashboardData';

function Dashboard() {
  return (
    <>
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={stat.isPositive}
          />
        ))}
      </div>
      <div className="charts-grid">
        <RevenueChart data={revenueData} />
        <TrafficChart data={trafficData} />
      </div>
      <RecentOrders orders={recentOrders} />
    </>
  );
}

export default Dashboard;
