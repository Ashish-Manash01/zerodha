import React from 'react';
import { Header, PortfolioAnalytics } from '../components';

export const Analytics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Analytics</h1>
          <p className="text-gray-600 mt-2">Detailed analysis of your portfolio performance</p>
        </div>

        <PortfolioAnalytics />
      </main>
    </div>
  );
};
