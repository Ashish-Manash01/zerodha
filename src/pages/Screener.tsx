import React from 'react';
import { Header, StockScreener } from '../components';

export const Screener: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Stock Screener</h1>
          <p className="text-gray-600 mt-2">Filter stocks based on various criteria</p>
        </div>

        <StockScreener />
      </main>
    </div>
  );
};
