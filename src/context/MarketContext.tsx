import React, { createContext, useContext, useState } from 'react';
import { Portfolio, Holding, Order } from '../types';

interface MarketContextType {
  portfolio: Portfolio;
  holdings: Holding[];
  orders: Order[];
  addOrder: (order: Order) => void;
  updateHolding: (holding: Holding) => void;
  updateCash: (amount: number) => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

const INITIAL_PORTFOLIO: Portfolio = {
  value: 500000,
  invested: 350000,
  totalValue: 500000,
  totalInvested: 350000,
  totalProfitLoss: 45000,
  totalProfitLossPercent: 12.86,
  cash: 150000,
  holdings: [],
};

const INITIAL_HOLDINGS: Holding[] = [
  {
    id: '1',
    symbol: 'RELIANCE',
    quantity: 100,
    buyPrice: 2500,
    currentPrice: 2750,
    value: 275000,
    profitLoss: 25000,
    profitLossPercent: 10,
  },
  {
    id: '2',
    symbol: 'TCS',
    quantity: 50,
    buyPrice: 3000,
    currentPrice: 3200,
    value: 160000,
    profitLoss: 10000,
    profitLossPercent: 6.67,
  },
  {
    id: '3',
    symbol: 'INFY',
    quantity: 200,
    buyPrice: 1800,
    currentPrice: 1650,
    value: 330000,
    profitLoss: -30000,
    profitLossPercent: -8.33,
  },
];

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolio, setPortfolio] = useState<Portfolio>(INITIAL_PORTFOLIO);
  const [holdings, setHoldings] = useState<Holding[]>(INITIAL_HOLDINGS);
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateHolding = (holding: Holding) => {
    setHoldings((prev) =>
      prev.map((h) => (h.id === holding.id ? holding : h))
    );
  };

  const updateCash = (amount: number) => {
    setPortfolio((prev) => ({
      ...prev,
      cash: prev.cash + amount,
      totalValue: prev.totalValue + amount,
    }));
  };

  return (
    <MarketContext.Provider
      value={{
        portfolio,
        holdings,
        orders,
        addOrder,
        updateHolding,
        updateCash,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within MarketProvider');
  }
  return context;
};
