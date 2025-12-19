export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  pe: number;
  high: number;
  low: number;
}

export interface Holding {
  id: string;
  symbol: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  value: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Order {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  timestamp: Date;
  totalValue: number;
}

export interface Portfolio {
  totalValue: number;
  totalInvested: number;
  totalProfitLoss: number;
  totalProfitLossPercent: number;
  cash: number;
  holdings: Holding[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  joinDate: Date;
  avatar?: string;
}

export interface ChartData {
  time: string;
  price: number;
}

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}
