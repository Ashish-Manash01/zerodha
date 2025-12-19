import React from 'react';
import { Stock } from '../types';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { formatCurrency, formatNumber, getChangeColor } from '../utils/helpers';

interface StockCardProps {
  stock: Stock;
  onTrade?: (stock: Stock) => void;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onTrade }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{stock.symbol}</h3>
          <p className="text-sm text-gray-600">{stock.name}</p>
        </div>
        {onTrade && (
          <button
            onClick={() => onTrade(stock)}
            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stock.price)}</p>
          <div className={`flex items-center space-x-2 ${getChangeColor(stock.change)}`}>
            {stock.change >= 0 ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span className="font-semibold">
              {stock.change >= 0 ? '+' : ''}{formatCurrency(stock.change)} ({stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm border-t pt-3">
          <div>
            <p className="text-gray-600">High</p>
            <p className="font-semibold text-gray-900">{formatCurrency(stock.high)}</p>
          </div>
          <div>
            <p className="text-gray-600">Low</p>
            <p className="font-semibold text-gray-900">{formatCurrency(stock.low)}</p>
          </div>
          <div>
            <p className="text-gray-600">P/E</p>
            <p className="font-semibold text-gray-900">{stock.pe.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">Volume</p>
            <p className="font-semibold text-gray-900">{formatNumber(stock.volume / 1000000, 1)}M</p>
          </div>
        </div>
      </div>
    </div>
  );
};
