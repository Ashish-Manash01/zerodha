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

export type OrderType = 'MARKET' | 'LIMIT' | 'STOP_LOSS';
export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';
export type OrderSide = 'BUY' | 'SELL';

export interface Order {
  id: string;
  symbol: string;
  side: OrderSide;
  quantity: number;
  price: number;
  orderType: OrderType;
  status: OrderStatus;
  timestamp: Date;
  totalValue: number;
  limitPrice?: number;
  stopPrice?: number;
}

export interface Trade {
  id: string;
  symbol: string;
  side: OrderSide;
  quantity: number;
  executionPrice: number;
  timestamp: Date;
  status: OrderStatus;
  totalValue: number;
}

export interface Portfolio {
  value: number;
  invested: number;
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

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface ChartData {
  time: string;
  price: number;
}
