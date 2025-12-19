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
