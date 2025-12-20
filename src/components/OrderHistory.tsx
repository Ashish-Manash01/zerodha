import React from 'react';
import { Order } from '../types';
import { formatCurrency } from '../utils/helpers';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface OrderHistoryProps {
  orders: Order[];
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle size={18} className="text-green-600" />;
      case 'PENDING':
        return <Clock size={18} className="text-yellow-600" />;
      case 'CANCELLED':
        return <XCircle size={18} className="text-red-600" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-50 text-green-700';
      case 'PENDING':
        return 'bg-yellow-50 text-yellow-700';
      case 'CANCELLED':
        return 'bg-red-50 text-red-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No orders placed yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Symbol
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Side
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Order Type
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">
                  Qty
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">
                  Price
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">
                  Total
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Time
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {order.symbol}
                  </td>

                  {/* BUY / SELL */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        order.side === 'BUY'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.side}
                    </span>
                  </td>

                  {/* MARKET / LIMIT / STOP_LOSS */}
                  <td className="py-3 px-4 text-gray-700">
                    {order.orderType}
                  </td>

                  <td className="py-3 px-4 text-right">
                    {order.quantity}
                  </td>

                  <td className="py-3 px-4 text-right">
                    {formatCurrency(order.price)}
                  </td>

                  <td className="py-3 px-4 text-right font-semibold">
                    {formatCurrency(order.totalValue)}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <div
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-gray-600 text-xs">
                    {order.timestamp.toLocaleString()}
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
