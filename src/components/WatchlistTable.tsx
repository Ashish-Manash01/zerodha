import React from 'react';
import { WatchlistItem } from '../types';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

interface WatchlistTableProps {
  items: WatchlistItem[];
  onRemove?: (symbol: string) => void;
}

export const WatchlistTable: React.FC<WatchlistTableProps> = ({ items, onRemove }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Watchlist</h2>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No items in watchlist</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Symbol</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Name</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-900">Price</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-900">Change</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-900">Change %</th>
                <th className="text-center py-3 px-6 font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold text-gray-900">{item.symbol}</td>
                  <td className="py-4 px-6 text-gray-600">{item.name}</td>
                  <td className="py-4 px-6 text-right font-semibold">{formatCurrency(item.price)}</td>
                  <td className={`py-4 px-6 text-right font-semibold flex items-center justify-end space-x-1 ${
                    item.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change >= 0 ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    <span>{item.change >= 0 ? '+' : ''}{formatCurrency(item.change)}</span>
                  </td>
                  <td className={`py-4 px-6 text-right font-semibold ${
                    item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                  </td>
                  <td className="py-4 px-6 text-center">
                    {onRemove && (
                      <button
                        onClick={() => onRemove(item.symbol)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
                        title="Remove from watchlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
