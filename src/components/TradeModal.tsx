import React, { useState } from 'react';
import { Stock, Order, OrderSide, OrderType } from '../types';
import { X } from 'lucide-react';
import { useMarket } from '../context/MarketContext';

interface TradeModalProps {
  stock: Stock;
  onClose: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({ stock, onClose }) => {
  const [side, setSide] = useState<OrderSide>('BUY');
  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [quantity, setQuantity] = useState(1);
  const [limitPrice, setLimitPrice] = useState(stock.price);

  const { addOrder, portfolio } = useMarket();

  const executionPrice =
    orderType === 'MARKET' ? stock.price : limitPrice;

  const totalValue = quantity * executionPrice;

  const canTrade =
    side === 'BUY' ? totalValue <= portfolio.cash : true;

  const handlePlaceOrder = () => {
    const order: Order = {
      id: crypto.randomUUID(),
      symbol: stock.symbol,
      side,
      orderType,
      quantity,
      price: executionPrice,
      status: 'COMPLETED',
      timestamp: new Date(),
      totalValue,
      limitPrice: orderType === 'LIMIT' ? limitPrice : undefined,
    };

    addOrder(order);

    alert(
      `Order placed successfully!\n${side} ${quantity} shares of ${stock.symbol} at ₹${executionPrice.toFixed(
        2
      )}`
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {stock.symbol}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* BUY / SELL */}
          <div className="flex space-x-2">
            {(['BUY', 'SELL'] as OrderSide[]).map((s) => (
              <button
                key={s}
                onClick={() => setSide(s)}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  side === s
                    ? s === 'BUY'
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Current Price */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-600 text-sm">Current Price</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{stock.price.toFixed(2)}
            </p>
          </div>

          {/* Order Type */}
          <div className="flex space-x-2">
            {(['MARKET', 'LIMIT'] as OrderType[]).map((type) => (
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

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Number(e.target.value)))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          {/* Limit Price */}
          {orderType === 'LIMIT' && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Limit Price
              </label>
              <input
                type="number"
                step="0.01"
                value={limitPrice}
                onChange={(e) =>
                  setLimitPrice(Number(e.target.value) || stock.price)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Rate</span>
              <span className="font-semibold">
                ₹{executionPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Quantity</span>
              <span className="font-semibold">{quantity}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-semibold text-gray-900">
                Total
              </span>
              <span className="font-bold text-lg">
                ₹{totalValue.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Insufficient funds */}
          {side === 'BUY' && !canTrade && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
              Insufficient balance. Available: ₹
              {portfolio.cash.toFixed(2)}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handlePlaceOrder}
            disabled={!canTrade}
            className={`w-full py-3 rounded-lg font-bold text-white transition ${
              canTrade
                ? side === 'BUY'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Place {side} Order
          </button>
        </div>
      </div>
    </div>
  );
};
