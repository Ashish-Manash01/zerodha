import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { apiService } from '../services/api';
import { Stock } from '../types';

interface Insights {
  gainers: Stock[];
  losers: Stock[];
  mostActive: Stock[];
}

export const MarketInsights: React.FC = () => {
  const { portfolio } = useMarket();
  const [insights, setInsights] = useState<Insights>({
    gainers: [],
    losers: [],
    mostActive: [],
  });

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const stocks = await apiService.getStocks();
        const sorted = [...stocks].sort((a, b) => b.changePercent - a.changePercent);

        setInsights({
          gainers: sorted.slice(0, 5),
          losers: sorted.slice(-5).reverse(),
          mostActive: [...stocks].sort((a, b) => b.volume - a.volume).slice(0, 5),
        });
      } catch (error) {
        console.error('Error fetching insights:', error);
      }
    };

    fetchInsights();
  }, []);

  const StockRow = ({ stock }: any) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition">
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{stock.symbol}</p>
        <p className="text-xs text-gray-600">{stock.name}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">₹{stock.price.toFixed(2)}</p>
        <div className={`flex items-center justify-end gap-1 text-sm ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {stock.changePercent >= 0 ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
          <span>{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow p-6 border border-blue-200">
          <p className="text-blue-600 text-sm font-medium">Portfolio Value</p>
          <p className="text-2xl font-bold text-blue-900 mt-2">₹{portfolio.value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow p-6 border border-green-200">
          <p className="text-green-600 text-sm font-medium">Cash Available</p>
          <p className="text-2xl font-bold text-green-900 mt-2">₹{portfolio.cash.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow p-6 border border-purple-200">
          <p className="text-purple-600 text-sm font-medium">Free Margin</p>
          <p className="text-2xl font-bold text-purple-900 mt-2">₹{Math.max(0, portfolio.cash).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow p-6 border border-orange-200">
          <p className="text-orange-600 text-sm font-medium">Total Invested</p>
          <p className="text-2xl font-bold text-orange-900 mt-2">₹{(portfolio.invested || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
      </div>

      {/* Market Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Gainers */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <TrendingUp size={20} />
              Top Gainers
            </h3>
          </div>
          <div>
            {insights.gainers.map((stock: any) => (
              <StockRow key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <TrendingDown size={20} />
              Top Losers
            </h3>
          </div>
          <div>
            {insights.losers.map((stock: any) => (
              <StockRow key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>

        {/* Most Active */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h3 className="text-white font-bold text-lg">Most Active</h3>
          </div>
          <div>
            {insights.mostActive.map((stock: any) => (
              <div key={stock.symbol} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{stock.symbol}</p>
                  <p className="text-xs text-gray-600">{(stock.volume / 1000000).toFixed(1)}M</p>
                </div>
                <p className="font-semibold text-gray-900">₹{stock.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
