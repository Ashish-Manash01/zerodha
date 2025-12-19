# 🚀 Zerodha Clone - Quick Start Guide

Welcome! Your Zerodha Clone stock trading platform is ready. Here's how to get started immediately.

## ⚡ Quick Start (5 minutes)

### 1. Install & Run

```bash
# Navigate to project directory
cd zerodha

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Open your browser: **http://localhost:5173**

### 2. Login

Use these demo credentials:
- **Email**: demo@zerodha.com
- **Password**: password

Or create a new account by clicking "Sign up"

### 3. Explore Features

- **Dashboard**: View your portfolio overview
- **Markets**: Browse and search stocks
- **Portfolio**: Check your holdings
- **Watchlist**: Monitor favorite stocks

## 📋 Project Structure

```
zerodha/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components (Dashboard, Market, etc.)
│   ├── context/        # State management (Auth, Market)
│   ├── services/       # API service
│   ├── types/          # TypeScript types
│   ├── utils/          # Helper functions
│   └── App.tsx         # Main app component
├── public/             # Static assets
├── package.json        # Dependencies
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS config
├── README.md           # Full documentation
└── DEPLOYMENT.md       # Deployment guide
```

## 🎯 Key Features

✅ **Dashboard** - Portfolio overview with profit/loss tracking
✅ **Stock Market** - Browse 8 sample stocks with real-time data
✅ **Trading** - Place buy/sell orders with market/limit options
✅ **Portfolio** - Track holdings with performance metrics
✅ **Watchlist** - Monitor favorite stocks
✅ **Charts** - Interactive price charts with multiple timeframes
✅ **Authentication** - User login and account management

## 🔧 Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run build
```

## 📊 Sample Data

The app includes:
- **8 Stocks**: RELIANCE, TCS, INFY, WIPRO, HDFC, ICICI, LT, BAJAJ-AUTO
- **Portfolio**: Pre-loaded with sample holdings
- **Orders**: Sample order history
- **Watchlist**: 5 sample watchlist items

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` and update the color scheme

### Modify Stock Data
Edit `src/services/api.ts` to update `MOCK_STOCKS`

### Add Features
Create new components in `src/components/`
Create new pages in `src/pages/`
Update routes in `src/App.tsx`

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag 'dist' folder to Netlify
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🔐 Important Security Notes

⚠️ **For Production:**
- Replace mock authentication with real backend
- Use secure API endpoints
- Implement proper error handling
- Add environment-based configuration
- Use HTTPS everywhere

## 💡 Tips

1. **Development**: Use React DevTools extension
2. **Styling**: Use Tailwind CSS utility classes
3. **Debugging**: Check browser console for errors
4. **Types**: Leverage TypeScript for IDE assistance

## 🆘 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Module Not Found
```bash
npm install
```

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)

## 🎓 Next Steps

1. **Explore the Code**: Understand the component structure
2. **Add Features**: Create new components and pages
3. **Connect Real API**: Replace mock data with real endpoints
4. **Deploy**: Push to production on Vercel/Netlify
5. **Monitor**: Setup error tracking and analytics

## 📞 Support

- Check [README.md](README.md) for full documentation
- Review code comments for implementation details
- Refer to [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help

---

**Happy Trading! 📈**

Built with ❤️ for traders worldwide.
