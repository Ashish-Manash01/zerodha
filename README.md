# Zerodha - Stock Trading Platform

A modern, fully-featured stock trading platform built with React, TypeScript, and Tailwind CSS. This application provides professional trading tools with real-time market data and advanced portfolio analytics.

## 🚀 Features

### Dashboard
- **Portfolio Overview**: Real-time portfolio value, P&L tracking
- **Quick Stats**: Holdings count, orders today, top gainers
- **Order History**: Recent trading activity and order status
- **Account Information**: User profile and account details

### Market View
- **Stock Listings**: Browse 20+ major Indian stocks with real-time prices
- **Advanced Search**: Search stocks by symbol or company name
- **Sorting Options**: Sort by name, price, or change percentage
- **Price Charts**: Interactive Line charts with Chart.js (1D, 1W, 1M, 3M, 1Y)

### Trading Interface
- **Market Orders**: Buy/Sell at current market price
- **Limit Orders**: Set custom price for execution
- **Order Validation**: Sufficient balance checking before placing orders
- **Real-time Updates**: Order confirmation and status tracking

### Portfolio Management
- **Holdings Tracking**: View all stocks with detailed metrics
  - Quantity and average buy price
  - Current price and total value
  - Profit/Loss and percentage returns
- **Portfolio Analytics**: 
  - Sector allocation doughnut chart
  - Top 5 holdings performance bar chart
  - Detailed holdings table with P&L metrics
- **Wealth Dashboard**: Comprehensive financial overview

### Watchlist
- **Add/Remove Stocks**: Create a personalized watchlist
- **Price Monitoring**: Track real-time price changes
- **Top Movers**: Quick view of most active stocks
- **Market Trends**: Identify trending stocks at a glance

### Market Insights
- **Top Gainers**: Real-time list of best performing stocks
- **Top Losers**: Identify struggling stocks
- **Most Active**: Track stocks with highest trading volume
- **Market Overview**: Portfolio value, cash, margin metrics

### Stock Screener
- **Advanced Filtering**: Filter by price range, P/E ratio, volume
- **Search**: Find stocks by symbol or name
- **Detailed Results**: View filtered stocks with key metrics
- **Quick Analysis**: Identify investment opportunities

### User Authentication
- **Login/Signup**: Secure authentication system
- **Account Management**: User profile and preferences
- **Session Management**: Persistent login with localStorage

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router v6
- **Charts**: Chart.js 4 with react-chartjs-2
- **Icons**: Lucide React
- **API Calls**: Axios
- **State Management**: React Context API + Custom Hooks

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd zerodha-clone
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## 🔐 Demo Credentials

Use these credentials to test the application:

- **Email**: demo@zerodha.com
- **Password**: password

Or sign up with your own credentials for a new account.

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.tsx
│   ├── PortfolioCard.tsx
│   ├── StockCard.tsx
│   ├── PriceChart.tsx
│   ├── TradeModal.tsx
│   ├── OrderHistory.tsx
│   ├── HoldingsTable.tsx
│   └── WatchlistTable.tsx
├── pages/              # Page components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Market.tsx
│   ├── Portfolio.tsx
│   └── Watchlist.tsx
├── context/            # React Context providers
│   ├── AuthContext.tsx
│   └── MarketContext.tsx
├── services/           # API and data services
│   └── api.ts
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── helpers.ts
├── App.tsx             # Main app component
├── main.tsx            # React entry point
└── index.css           # Global styles
```

## 🎯 Key Components Overview

### Authentication Flow
- Users log in or create an account
- Session persisted using localStorage
- Protected routes redirect to login if not authenticated

### State Management
- **AuthContext**: Manages user authentication state
- **MarketContext**: Manages portfolio, holdings, and orders data
- Mock data provided for demonstration

### API Integration
- Mock API service in `src/services/api.ts`
- Can be replaced with real backend API endpoints
- Simulated delays for realistic async behavior

## 💡 Usage Guide

### Placing a Trade
1. Navigate to **Markets** section
2. Find desired stock or search by symbol
3. Click on stock card or press "Trade" button
4. Select BUY/SELL and order type (Market/Limit)
5. Enter quantity and confirm order
6. Order appears in portfolio and order history

### Managing Portfolio
1. Go to **Portfolio** section
2. View all holdings with P&L metrics
3. See gainers vs losers statistics
4. Track total portfolio value and cash balance

### Creating Watchlist
1. Navigate to **Watchlist**
2. Click "Add Stock" button
3. Select stocks to monitor
4. View real-time price updates
5. Remove stocks as needed

### Monitoring Orders
1. Check **Dashboard** for recent orders
2. View complete order history with status
3. Track trade execution prices and volumes

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel automatically builds and deploys

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

Or connect to Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to Docker

1. Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

2. Build and run:
```bash
docker build -t zerodha-clone .
docker run -p 3000:3000 zerodha-clone
```

### Environment Variables

Create a `.env.local` file:
```
VITE_API_BASE_URL=https://your-api-url.com
VITE_APP_NAME=Zerodha Clone
```

## 🔄 Mock Data

The application includes comprehensive mock data for testing:

- **8 Sample Stocks**: RELIANCE, TCS, INFY, WIPRO, HDFC, ICICI, LT, BAJAJ-AUTO
- **Sample Portfolio**: Pre-populated holdings with profit/loss data
- **Order History**: Sample completed orders for demonstration

To use real data:
1. Replace API endpoints in `src/services/api.ts`
2. Update data models in `src/types/index.ts` as needed
3. Modify context providers to handle real API responses

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
}
```

### Modify Mock Data
Edit `src/services/api.ts` - update `MOCK_STOCKS` and `INITIAL_HOLDINGS`

### Add New Features
- Create new components in `src/components/`
- Add new pages in `src/pages/`
- Update routes in `src/App.tsx`
- Extend types in `src/types/index.ts`

## 🐛 Common Issues

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Module Not Found
```bash
# Reinstall dependencies
npm install
```

## 🔒 Security Considerations

⚠️ **For Production:**
- Implement proper backend authentication
- Use secure API authentication (JWT tokens)
- Never store sensitive data in localStorage
- Add rate limiting and DDoS protection
- Implement proper error handling and logging
- Use HTTPS everywhere
- Add CORS properly configured

## 📊 Performance Tips

- Lazy load routes for faster initial load
- Implement pagination for large data sets
- Use memoization for expensive computations
- Optimize images and assets
- Enable gzip compression
- Use CDN for static assets

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 📞 Support

For issues, questions, or suggestions:
- Create an Issue on GitHub
- Check existing documentation
- Review mock data implementation

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com)

## 🏆 Project Status

- ✅ Core features implemented
- ✅ Mock data integrated
- ✅ UI/UX complete with Tailwind CSS
- ✅ Authentication system
- ✅ State management with Context API
- 🔄 Real API integration (ready for backend)
- 🔄 Advanced features (alerts, notifications)
- 🔄 Mobile optimization

## 📈 Future Enhancements

- [ ] Real-time WebSocket for live prices
- [ ] Advanced charting with technical indicators
- [ ] Push notifications for price alerts
- [ ] Portfolio analytics and recommendations
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Advanced filtering and screeners
- [ ] Options trading support
- [ ] Mutual funds integration
- [ ] IPO application system

---

**Built with ❤️ for traders worldwide**
