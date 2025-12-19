import { ChartData } from '../types';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(value);
};

export const formatNumber = (value: number, decimals = 2): string => {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const calculateProfitLoss = (buyPrice: number, currentPrice: number, quantity: number) => {
  const profitLoss = (currentPrice - buyPrice) * quantity;
  const profitLossPercent = ((currentPrice - buyPrice) / buyPrice) * 100;
  return { profitLoss, profitLossPercent };
};

export const getChangeColor = (change: number): string => {
  return change >= 0 ? 'text-green-600' : 'text-red-600';
};

export const getChangeBgColor = (change: number): string => {
  return change >= 0 ? 'bg-green-50' : 'bg-red-50';
};

export const generateChartData = (): ChartData[] => {
  const data: ChartData[] = [];
  let price = 2500;
  
  for (let i = 0; i < 30; i++) {
    const change = (Math.random() - 0.5) * 100;
    price += change;
    data.push({
      time: `Day ${i + 1}`,
      price: Math.round(price * 100) / 100,
    });
  }
  
  return data;
};
