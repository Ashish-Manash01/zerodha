import React, { useState } from 'react';
import { Bell, X, Plus, Trash2 } from 'lucide-react';

interface PriceAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  type: 'ABOVE' | 'BELOW';
  isActive: boolean;
}

export const PriceAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    { id: '1', symbol: 'RELIANCE', targetPrice: 2800, type: 'ABOVE', isActive: true },
    { id: '2', symbol: 'TCS', targetPrice: 3100, type: 'BELOW', isActive: true },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    symbol: '',
    targetPrice: 0,
    type: 'ABOVE' as const,
  });

  const handleAddAlert = () => {
    if (newAlert.symbol && newAlert.targetPrice > 0) {
      setAlerts([
        ...alerts,
        {
          id: Date.now().toString(),
          symbol: newAlert.symbol,
          targetPrice: newAlert.targetPrice,
          type: newAlert.type,
          isActive: true,
        },
      ]);
      setNewAlert({ symbol: '', targetPrice: 0, type: 'ABOVE' });
      setIsOpen(false);
    }
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const handleToggleAlert = (id: string) => {
    setAlerts(
      alerts.map((a) =>
        a.id === id ? { ...a, isActive: !a.isActive } : a
      )
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
        title="Price Alerts"
      >
        <Bell size={20} />
        {alerts.filter((a) => a.isActive).length > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {alerts.filter((a) => a.isActive).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Price Alerts</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>

          {/* Alerts List */}
          <div className="max-h-64 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No price alerts yet
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50"
                >
                  <div>
                    <div className="font-semibold text-gray-900">
                      {alert.symbol}
                    </div>
                    <div className="text-xs text-gray-600">
                      Alert when price {alert.type === 'ABOVE' ? '↑' : '↓'} ₹
                      {alert.targetPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={alert.isActive}
                        onChange={() => handleToggleAlert(alert.id)}
                        className="w-4 h-4"
                      />
                    </label>
                    <button
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add New Alert */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            <input
              type="text"
              placeholder="Stock symbol"
              value={newAlert.symbol}
              onChange={(e) => setNewAlert({ ...newAlert, symbol: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Target price"
                value={newAlert.targetPrice}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, targetPrice: Number(e.target.value) })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />

              <select
                value={newAlert.type}
                onChange={(e) =>
                  setNewAlert({
                    ...newAlert,
                    type: e.target.value as 'ABOVE' | 'BELOW',
                  })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="ABOVE">Above</option>
                <option value="BELOW">Below</option>
              </select>
            </div>

            <button
              onClick={handleAddAlert}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 text-sm"
            >
              <Plus size={16} />
              Add Alert
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
