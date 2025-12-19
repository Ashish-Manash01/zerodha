import React from 'react';
import { Holding } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

interface HoldingsTableProps {
  holdings: Holding[];
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({ holdings }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Holdings</h2>
      </div>

      {holdings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No holdings yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Symbol</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-900">Qty</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-900">Avg. Price</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-900">Current Price</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-900">Value</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-900">P&L</th>
                <th className="text-right py-3 px-6 font-semibold text-gray-900">P&L %</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <tr key={holding.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold text-gray-900">{holding.symbol}</td>
                  <td className="py-4 px-6 text-right">{holding.quantity}</td>
                  <td className="py-4 px-6 text-right">{formatCurrency(holding.buyPrice)}</td>
                  <td className="py-4 px-6 text-right">{formatCurrency(holding.currentPrice)}</td>
                  <td className="py-4 px-6 text-right font-semibold">{formatCurrency(holding.value)}</td>
                  <td className={`py-4 px-6 text-right font-semibold flex items-center justify-end space-x-1 ${
                    holding.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {holding.profitLoss >= 0 ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    <span>{formatCurrency(holding.profitLoss)}</span>
                  </td>
                  <td className={`py-4 px-6 text-right font-semibold ${
                    holding.profitLossPercent >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {holding.profitLossPercent >= 0 ? '+' : ''}{holding.profitLossPercent.toFixed(2)}%
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
