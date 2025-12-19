import React, { useState, useEffect } from 'react';
import { Header, StockCard, TradeModal, PriceChart } from '../components';
import { apiService } from '../services/api';
import { Stock } from '../types';
import { Search } from 'lucide-react';

export const Market: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [chartStock, setChartStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change'>('name');

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      const data = await apiService.getStocks();
      setStocks(data);
      setFilteredStocks(data);
      setLoading(false);
    };

    fetchStocks();
  }, []);

  useEffect(() => {
    let filtered = stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.changePercent - a.changePercent;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredStocks(filtered);
  }, [searchTerm, stocks, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Market Overview</h1>
          <p className="text-gray-600 mt-2">Explore and trade stocks</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by symbol or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="change">Sort by Change</option>
            </select>
          </div>
        </div>

        {/* Stocks Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading stocks...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredStocks.map((stock) => (
              <div key={stock.symbol}>
                <StockCard
                  stock={stock}
                  onTrade={() => setSelectedStock(stock)}
                />
                {/* Quick view link */}
                <button
                  onClick={() => setChartStock(stock)}
                  className="w-full mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition"
                >
                  View Chart
                </button>
              </div>
            ))}
          </div>
        )}

        {filteredStocks.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No stocks found matching your search</p>
          </div>
        )}
      </main>

      {/* Trade Modal */}
      {selectedStock && (
        <TradeModal stock={selectedStock} onClose={() => setSelectedStock(null)} />
      )}

      {/* Chart Modal */}
      {chartStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <PriceChart
              stock={chartStock}
              onClose={() => setChartStock(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
