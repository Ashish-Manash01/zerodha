import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { formatCurrency, formatNumber } from '../utils/helpers';

export const PortfolioCard: React.FC = () => {
  const { portfolio } = useMarket();
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Portfolio</h2>
        <button
          onClick={() => setIsHidden(!isHidden)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          {isHidden ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-gray-600 text-sm mb-1">Total Value</p>
          <p className="text-3xl font-bold text-gray-900">
            {isHidden ? '***' : formatCurrency(portfolio.totalValue)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Invested</p>
            <p className="text-lg font-semibold text-gray-900">
              {isHidden ? '***' : formatCurrency(portfolio.totalInvested)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Available Cash</p>
            <p className="text-lg font-semibold text-gray-900">
              {isHidden ? '***' : formatCurrency(portfolio.cash)}
            </p>
          </div>
        </div>

        <div className={`rounded-lg p-4 flex items-center space-x-3 ${
          portfolio.totalProfitLoss >= 0 ? 'bg-green-50' : 'bg-red-50'
        }`}>
          {portfolio.totalProfitLoss >= 0 ? (
            <TrendingUp size={24} className="text-green-600" />
          ) : (
            <TrendingDown size={24} className="text-red-600" />
          )}
          <div>
            <p className="text-gray-600 text-sm">Total Profit/Loss</p>
            <p className={`text-lg font-semibold ${
              portfolio.totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {isHidden ? '***' : formatCurrency(portfolio.totalProfitLoss)} (
              {portfolio.totalProfitLossPercent.toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
