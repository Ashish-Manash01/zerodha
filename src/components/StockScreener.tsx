import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { Stock } from '../types';
import { apiService } from '../services/api';

export default function StockScreener() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 15000,
    minPE: 0,
    maxPE: 100,
    minVolume: 0,
  });

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await apiService.getStocks();
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, []);

  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) => {
      const matchesSearch = 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = stock.price >= filters.minPrice && stock.price <= filters.maxPrice;
      const matchesPE = stock.pe >= filters.minPE && stock.pe <= filters.maxPE;
      const matchesVolume = stock.volume >= filters.minVolume;

      return matchesSearch && matchesPrice && matchesPE && matchesVolume;
    });
  }, [stocks, searchTerm, filters]);

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">Stock Screener</h3>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search by Symbol or Name</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="e.g., RELIANCE, TCS, Infosys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
            <input
              type="number"
              min="0"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="₹0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
            <input
              type="number"
              min="0"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="₹15000"
            />
          </div>

          {/* P/E Ratio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min P/E</label>
            <input
              type="number"
              min="0"
              value={filters.minPE}
              onChange={(e) => setFilters({ ...filters, minPE: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max P/E</label>
            <input
              type="number"
              min="0"
              value={filters.maxPE}
              onChange={(e) => setFilters({ ...filters, maxPE: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="100"
            />
          </div>

          {/* Volume */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Volume (M)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={filters.minVolume / 1000000}
              onChange={(e) => setFilters({ ...filters, minVolume: Number(e.target.value) * 1000000 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => {
            setSearchTerm('');
            setFilters({ minPrice: 0, maxPrice: 15000, minPE: 0, maxPE: 100, minVolume: 0 });
          }}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Reset Filters
        </button>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Results: {filteredStocks.length} stocks found</h3>
        </div>

        {filteredStocks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Symbol</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Change %</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">P/E Ratio</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Volume</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock) => (
                  <tr key={stock.symbol} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm font-semibold text-blue-600">{stock.symbol}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{stock.name}</td>
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">₹{stock.price.toFixed(2)}</td>
                    <td className={`px-6 py-3 text-sm font-semibold ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700">{stock.pe.toFixed(1)}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{(stock.volume / 1000000).toFixed(1)}M</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{stock.marketCap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg">No stocks match your criteria</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
