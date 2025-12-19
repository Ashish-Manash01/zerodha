import React, { useState, useEffect } from 'react';
import { Header, WatchlistTable, StockCard, TradeModal } from '../components';
import { apiService } from '../services/api';
import { WatchlistItem, Stock } from '../types';
import { Plus } from 'lucide-react';

export const Watchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [allStocks, setAllStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddStock, setShowAddStock] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [stocks, watchlistData] = await Promise.all([
        apiService.getStocks(),
        apiService.getWatchlist(),
      ]);
      setAllStocks(stocks);
      setWatchlist(watchlistData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleRemove = (symbol: string) => {
    setWatchlist(watchlist.filter((item) => item.symbol !== symbol));
  };

  const handleAddStock = async (stock: Stock) => {
    const newItem = await apiService.addToWatchlist(stock);
    setWatchlist([...watchlist, newItem]);
    setShowAddStock(false);
  };

  const availableStocks = allStocks.filter(
    (stock) => !watchlist.find((item) => item.symbol === stock.symbol)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Watchlist</h1>
            <p className="text-gray-600 mt-2">Monitor your favorite stocks</p>
          </div>
          <button
            onClick={() => setShowAddStock(!showAddStock)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={20} />
            <span>Add Stock</span>
          </button>
        </div>

        {/* Add Stock Section */}
        {showAddStock && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add to Watchlist</h2>
            {availableStocks.length === 0 ? (
              <p className="text-gray-500">All stocks are already in your watchlist</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableStocks.map((stock) => (
                  <div key={stock.symbol} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                    <h3 className="font-bold text-gray-900 mb-2">{stock.symbol}</h3>
                    <p className="text-sm text-gray-600 mb-3">{stock.name}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">₹{stock.price.toFixed(2)}</span>
                      <span className={`text-sm font-semibold ${
                        stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddStock(stock)}
                      className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-2 rounded-lg transition"
                    >
                      Add to Watchlist
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Watchlist Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading watchlist...</p>
          </div>
        ) : (
          <>
            <WatchlistTable items={watchlist} onRemove={handleRemove} />

            {/* Quick Info */}
            {watchlist.length > 0 && (
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-2">Top Movers Today</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {watchlist
                    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
                    .slice(0, 4)
                    .map((item) => (
                      <div key={item.symbol} className="bg-white rounded p-3">
                        <p className="font-semibold text-gray-900">{item.symbol}</p>
                        <p className={`text-sm font-bold ${
                          item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Trade Modal */}
      {selectedStock && (
        <TradeModal stock={selectedStock} onClose={() => setSelectedStock(null)} />
      )}
    </div>
  );
};
