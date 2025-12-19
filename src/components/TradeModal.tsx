import React, { useState } from 'react';
import { Stock } from '../types';
import { X } from 'lucide-react';
import { useMarket } from '../context/MarketContext';

interface TradeModalProps {
  stock: Stock;
  onClose: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({ stock, onClose }) => {
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [limitPrice, setLimitPrice] = useState(stock.price);
  const { addOrder, portfolio } = useMarket();

  const totalValue = quantity * (orderType === 'MARKET' ? stock.price : limitPrice);
  const canTrade = tradeType === 'BUY' ? totalValue <= portfolio.cash : true;

  const handlePlaceOrder = () => {
    const order = {
      id: Date.now().toString(),
      symbol: stock.symbol,
      type: tradeType,
      quantity,
      price: orderType === 'MARKET' ? stock.price : limitPrice,
      status: 'COMPLETED' as const,
      timestamp: new Date(),
      totalValue,
    };
    addOrder(order);
    alert(`Order placed successfully!\n${tradeType} ${quantity} shares of ${stock.symbol} at ₹${order.price.toFixed(2)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{stock.symbol}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Trade Type Selection */}
          <div className="flex space-x-2">
            {(['BUY', 'SELL'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTradeType(type)}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  tradeType === type
                    ? type === 'BUY'
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Current Price */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-600 text-sm">Current Price</p>
            <p className="text-2xl font-bold text-gray-900">₹{stock.price.toFixed(2)}</p>
          </div>

          {/* Order Type Selection */}
          <div className="flex space-x-2">
            {(['MARKET', 'LIMIT'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`flex-1 py-1 rounded font-medium text-sm transition ${
                  orderType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type} Order
              </button>
            ))}
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          {/* Limit Price Input */}
          {orderType === 'LIMIT' && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Limit Price</label>
              <input
                type="number"
                step="0.01"
                value={limitPrice}
                onChange={(e) => setLimitPrice(parseFloat(e.target.value) || stock.price)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Rate</span>
              <span className="font-semibold">₹{(orderType === 'MARKET' ? stock.price : limitPrice).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Quantity</span>
              <span className="font-semibold">{quantity}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-lg">₹{totalValue.toFixed(2)}</span>
            </div>
          </div>

          {tradeType === 'BUY' && !canTrade && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
              Insufficient balance. Available: ₹{portfolio.cash.toFixed(2)}
            </div>
          )}

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={!canTrade}
            className={`w-full py-3 rounded-lg font-bold text-white transition ${
              canTrade
                ? tradeType === 'BUY'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Place {tradeType} Order
          </button>
        </div>
      </div>
    </div>
  );
};
