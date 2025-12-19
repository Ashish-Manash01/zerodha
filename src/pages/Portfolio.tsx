import React from 'react';
import { Header, HoldingsTable, PortfolioCard } from '../components';
import { useMarket } from '../context/MarketContext';
import { formatCurrency } from '../utils/helpers';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { portfolio, holdings } = useMarket();

  const gainers = holdings.filter((h) => h.profitLoss > 0);
  const losers = holdings.filter((h) => h.profitLoss < 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-gray-600 mt-2">Manage your investments and track performance</p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(portfolio.totalValue)}
                </p>
              </div>
              <DollarSign size={32} className="text-blue-600 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Invested</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(portfolio.totalInvested)}
                </p>
              </div>
              <TrendingDown size={32} className="text-gray-600 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Available Cash</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(portfolio.cash)}
                </p>
              </div>
              <DollarSign size={32} className="text-green-600 opacity-50" />
            </div>
          </div>

          <div className={`rounded-lg shadow-sm border p-6 ${
            portfolio.totalProfitLoss >= 0
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm mb-1 ${
                  portfolio.totalProfitLoss >= 0 ? 'text-green-700' : 'text-red-700'
                }`}>
                  Profit/Loss
                </p>
                <p className={`text-2xl font-bold ${
                  portfolio.totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(portfolio.totalProfitLoss)}
                </p>
              </div>
              {portfolio.totalProfitLoss >= 0 ? (
                <TrendingUp size={32} className="text-green-600 opacity-50" />
              ) : (
                <TrendingDown size={32} className="text-red-600 opacity-50" />
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 text-sm mb-2">Total Holdings</p>
            <p className="text-3xl font-bold text-gray-900">{holdings.length}</p>
          </div>

          <div className="bg-green-50 rounded-lg shadow-sm border border-green-200 p-6">
            <p className="text-green-700 text-sm mb-2">Gainers</p>
            <p className="text-3xl font-bold text-green-600">{gainers.length}</p>
          </div>

          <div className="bg-red-50 rounded-lg shadow-sm border border-red-200 p-6">
            <p className="text-red-700 text-sm mb-2">Losers</p>
            <p className="text-3xl font-bold text-red-600">{losers.length}</p>
          </div>
        </div>

        {/* Holdings Table */}
        <HoldingsTable holdings={holdings} />
      </main>
    </div>
  );
};
