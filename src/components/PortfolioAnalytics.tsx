import React from 'react';
import { useMarket } from '../context/MarketContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PortfolioAnalytics() {
  const { portfolio, holdings } = useMarket();

  const totalGain = holdings.reduce((sum, h) => {
    const gain = (h.currentPrice - h.buyPrice) * h.quantity;
    return sum + gain;
  }, 0);

  const totalGainPercent = (totalGain / (portfolio.invested || 1)) * 100;

  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-gray-600 text-sm">Total Portfolio Value</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">₹{portfolio.value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-gray-600 text-sm">Total Invested</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">₹{(portfolio.invested || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        <div className={`bg-white rounded-lg shadow p-6 border border-gray-200`}>
          <p className="text-gray-600 text-sm">Total Gain/Loss</p>
          <div className="flex items-center gap-2 mt-2">
            {totalGain >= 0 ? (
              <>
                <TrendingUp className="text-green-500" size={28} />
                <p className="text-3xl font-bold text-green-500">₹{Math.abs(totalGain).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </>
            ) : (
              <>
                <TrendingDown className="text-red-500" size={28} />
                <p className="text-3xl font-bold text-red-500">₹{Math.abs(totalGain).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </>
            )}
          </div>
          <p className={`text-sm mt-2 ${totalGainPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalGainPercent >= 0 ? '+' : ''}{totalGainPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Holdings List */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Holdings Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Symbol</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Qty</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Buy Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Current Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Gain/Loss</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">%</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => {
                const gain = (holding.currentPrice - holding.buyPrice) * holding.quantity;
                const gainPercent = ((holding.currentPrice - holding.buyPrice) / holding.buyPrice) * 100;
                const isPositive = gain >= 0;

                return (
                  <tr key={holding.symbol} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{holding.symbol}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{holding.quantity}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">₹{holding.buyPrice.toFixed(2)}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">₹{holding.currentPrice.toFixed(2)}</td>
                    <td className={`px-6 py-3 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{Math.abs(gain).toFixed(2)}
                    </td>
                    <td className={`px-6 py-3 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}{gainPercent.toFixed(2)}%
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
      sectors['Consumer'] += value;
    }
  });

  const sectorValues = Object.entries(sectors)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  const doughnutData = {
    labels: sectorValues.map((s) => s.name),
    datasets: [
      {
        data: sectorValues.map((s) => s.value),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#06B6D4',
          '#EC4899',
          '#6366F1',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  // Calculate performance metrics
  const gainers = holdings
    .map((h) => ({
      symbol: h.symbol,
      change: ((h.currentPrice - h.buyPrice) / h.buyPrice) * 100,
    }))
    .sort((a, b) => b.change - a.change)
    .slice(0, 5);

  const barData = {
    labels: gainers.map((g) => g.symbol),
    datasets: [
      {
        label: 'Performance %',
        data: gainers.map((g) => g.change),
        backgroundColor: gainers.map((g) => (g.change >= 0 ? '#10B981' : '#EF4444')),
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `${value}%`,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const totalGain = holdings.reduce((sum, h) => {
    const gain = (h.currentPrice - h.buyPrice) * h.quantity;
    return sum + gain;
  }, 0);

  const totalGainPercent = (totalGain / (portfolio.invested || 1)) * 100;

  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-gray-600 text-sm">Total Portfolio Value</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">₹{portfolio.value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <p className="text-gray-600 text-sm">Total Invested</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">₹{(portfolio.invested || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        <div className={`bg-white rounded-lg shadow p-6 border border-gray-200`}>
          <p className="text-gray-600 text-sm">Total Gain/Loss</p>
          <div className="flex items-center gap-2 mt-2">
            {totalGain >= 0 ? (
              <>
                <TrendingUp className="text-green-500" size={28} />
                <p className="text-3xl font-bold text-green-500">₹{Math.abs(totalGain).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </>
            ) : (
              <>
                <TrendingDown className="text-red-500" size={28} />
                <p className="text-3xl font-bold text-red-500">₹{Math.abs(totalGain).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </>
            )}
          </div>
          <p className={`text-sm mt-2 ${totalGainPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalGainPercent >= 0 ? '+' : ''}{totalGainPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Allocation */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Sector Allocation</h3>
          {sectorValues.length > 0 ? (
            <div style={{ height: '300px' }}>
              <Doughnut data={doughnutData} options={chartOptions} />
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No holdings to display</p>
          )}
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top 5 Holdings Performance</h3>
          {gainers.length > 0 ? (
            <div style={{ height: '300px' }}>
              <Bar data={barData} options={barOptions} />
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No holdings to display</p>
          )}
        </div>
      </div>

      {/* Holdings List */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Holdings Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Symbol</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Qty</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Buy Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Current Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Gain/Loss</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">%</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => {
                const gain = (holding.currentPrice - holding.buyPrice) * holding.quantity;
                const gainPercent = ((holding.currentPrice - holding.buyPrice) / holding.buyPrice) * 100;
                const isPositive = gain >= 0;

                return (
                  <tr key={holding.symbol} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{holding.symbol}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{holding.quantity}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">₹{holding.buyPrice.toFixed(2)}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">₹{holding.currentPrice.toFixed(2)}</td>
                    <td className={`px-6 py-3 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{Math.abs(gain).toFixed(2)}
                    </td>
                    <td className={`px-6 py-3 text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}{gainPercent.toFixed(2)}%
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
};
