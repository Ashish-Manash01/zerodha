import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Stock, ChartData } from '../types';
import { generateChartData } from '../utils/helpers';
import { X } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface PriceChartProps {
  stock: Stock;
  onClose: () => void;
}

export const PriceChart: React.FC<PriceChartProps> = ({ stock, onClose }) => {
  const [chartData] = useState<ChartData[]>(generateChartData());
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');

  const data = {
    labels: chartData.map((d) => d.time),
    datasets: [
      {
        label: `${stock.symbol} Price`,
        data: chartData.map((d) => d.price),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        callbacks: {
          label: (context: any) => `₹${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: any) => `₹${value}`,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{stock.symbol}</h3>
          <p className="text-2xl font-bold text-gray-900">₹{stock.price.toFixed(2)}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
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

      <div style={{ height: '400px' }}>
        <Line data={data} options={options} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-sm border-t pt-4">
        <div>
          <p className="text-gray-600">High</p>
          <p className="font-semibold text-gray-900">₹{stock.high.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">Low</p>
          <p className="font-semibold text-gray-900">₹{stock.low.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">Volume</p>
          <p className="font-semibold text-gray-900">{(stock.volume / 1000000).toFixed(1)}M</p>
        </div>
        <div>
          <p className="text-gray-600">Market Cap</p>
          <p className="font-semibold text-gray-900">{stock.marketCap}</p>
        </div>
      </div>
    </div>
  );
};
