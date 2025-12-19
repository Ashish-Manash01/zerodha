import React from 'react';
import { Header, PortfolioCard, OrderHistory } from '../components';
import { useMarket } from '../context/MarketContext';

export const Dashboard: React.FC = () => {
  const { holdings, orders } = useMarket();

  const topGainers = holdings
    .sort((a, b) => b.profitLossPercent - a.profitLossPercent)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to your Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your portfolio and trade with ease</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Portfolio Card */}
          <div className="lg:col-span-2">
            <PortfolioCard />
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 text-sm mb-1">Total Holdings</p>
              <p className="text-3xl font-bold text-gray-900">{holdings.length}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 text-sm mb-1">Orders Today</p>
              <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 text-sm mb-1">Top Gainer</p>
              <p className="text-xl font-bold text-green-600">
                {topGainers[0]?.symbol || 'N/A'}
              </p>
              {topGainers[0] && (
                <p className="text-sm text-gray-600">+{topGainers[0].profitLossPercent.toFixed(2)}%</p>
              )}
            </div>
          </div>
        </div>

        {/* Order History */}
        <OrderHistory orders={orders} />
      </main>
    </div>
  );
};
