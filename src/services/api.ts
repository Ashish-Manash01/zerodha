import { Stock, WatchlistItem } from '../types';

export const MOCK_STOCKS: Stock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    price: 2750,
    change: 45,
    changePercent: 1.66,
    volume: 50000000,
    marketCap: '₹17.5L Cr',
    pe: 23.5,
    high: 2800,
    low: 2700,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    price: 3200,
    change: 35,
    changePercent: 1.11,
    volume: 30000000,
    marketCap: '₹12.8L Cr',
    pe: 28.2,
    high: 3250,
    low: 3100,
  },
  {
    symbol: 'INFY',
    name: 'Infosys',
    price: 1650,
    change: -25,
    changePercent: -1.49,
    volume: 40000000,
    marketCap: '₹6.6L Cr',
    pe: 25.8,
    high: 1700,
    low: 1620,
  },
  {
    symbol: 'WIPRO',
    name: 'Wipro',
    price: 380,
    change: 5,
    changePercent: 1.32,
    volume: 60000000,
    marketCap: '₹1.52L Cr',
    pe: 18.5,
    high: 390,
    low: 370,
  },
  {
    symbol: 'HDFC',
    name: 'HDFC Bank',
    price: 1550,
    change: -15,
    changePercent: -0.96,
    volume: 35000000,
    marketCap: '₹8.7L Cr',
    pe: 22.3,
    high: 1580,
    low: 1520,
  },
  {
    symbol: 'ICICI',
    name: 'ICICI Bank',
    price: 1180,
    change: 12,
    changePercent: 1.02,
    volume: 45000000,
    marketCap: '₹6.5L Cr',
    pe: 18.9,
    high: 1200,
    low: 1150,
  },
  {
    symbol: 'LT',
    name: 'Larsen & Toubro',
    price: 2800,
    change: 40,
    changePercent: 1.45,
    volume: 25000000,
    marketCap: '₹3.36L Cr',
    pe: 32.5,
    high: 2850,
    low: 2750,
  },
  {
    symbol: 'BAJAJ-AUTO',
    name: 'Bajaj Auto',
    price: 6850,
    change: 125,
    changePercent: 1.85,
    volume: 5000000,
    marketCap: '₹1.74L Cr',
    pe: 15.2,
    high: 6950,
    low: 6700,
  },
];

export const MOCK_WATCHLIST: WatchlistItem[] = [
  { id: '1', symbol: 'RELIANCE', name: 'Reliance Industries', price: 2750, change: 45, changePercent: 1.66 },
  { id: '2', symbol: 'TCS', name: 'Tata Consultancy Services', price: 3200, change: 35, changePercent: 1.11 },
  { id: '3', symbol: 'INFY', name: 'Infosys', price: 1650, change: -25, changePercent: -1.49 },
  { id: '4', symbol: 'HDFC', name: 'HDFC Bank', price: 1550, change: -15, changePercent: -0.96 },
  { id: '5', symbol: 'WIPRO', name: 'Wipro', price: 380, change: 5, changePercent: 1.32 },
];

export const apiService = {
  getStocks: async (): Promise<Stock[]> => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_STOCKS), 500);
    });
  },

  getStock: async (symbol: string): Promise<Stock | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_STOCKS.find((s) => s.symbol === symbol) || null);
      }, 300);
    });
  },

  getWatchlist: async (): Promise<WatchlistItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_WATCHLIST), 400);
    });
  },

  addToWatchlist: async (stock: Stock): Promise<WatchlistItem> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now().toString(),
          symbol: stock.symbol,
          name: stock.name,
          price: stock.price,
          change: stock.change,
          changePercent: stock.changePercent,
        });
      }, 200);
    });
  },

  removeFromWatchlist: async (symbol: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 200);
    });
  },
};
