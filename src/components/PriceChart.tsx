import React, { useState } from 'react';
import { Stock } from '../types';
import { X, TrendingUp, TrendingDown } from 'lucide-react';

interface PriceChartProps {
  stock: Stock;
  onClose: () => void;
}

export const PriceChart: React.FC<PriceChartProps> = ({ stock, onClose }) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const isPositive = stock.change >= 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{stock.symbol}</h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-gray-900">₹{stock.price.toFixed(2)}</p>
            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              <span className="font-semibold">{isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex space-x-2 mb-6">
        {(['1D', '1W', '1M', '3M', '1Y'] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              timeframe === tf
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Simple price movement indicator */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-gray-600 text-sm">Price Chart Visualization</p>
          <div className="mt-2 h-32 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-sm mb-2">Opening: ₹{(stock.price - stock.change).toFixed(2)}</p>
              <p className="text-4xl font-bold text-blue-600">↗</p>
              <p className="text-sm mt-2">Closing: ₹{stock.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-4">
        <div>
          <p className="text-gray-600 text-sm">High</p>
          <p className="font-semibold text-gray-900">₹{stock.high.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Low</p>
          <p className="font-semibold text-gray-900">₹{stock.low.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Volume</p>
          <p className="font-semibold text-gray-900">{(stock.volume / 1000000).toFixed(1)}M</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">P/E Ratio</p>
          <p className="font-semibold text-gray-900">{stock.pe.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
