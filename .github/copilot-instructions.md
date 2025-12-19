## Zerodha Clone Project - GitHub Copilot Instructions

This project is a comprehensive stock trading platform built with React and TypeScript.

### Project Overview
- **Type**: React + Vite + TypeScript + Tailwind CSS
- **Purpose**: Full-featured trading platform clone with authentication, portfolio management, and trading interface
- **Target Users**: Traders and investors

### Key Architecture
- **Frontend**: React 18 with React Router v6 for navigation
- **State Management**: React Context API for authentication and market data
- **Styling**: Tailwind CSS for responsive design
- **Charts**: Recharts for price visualization
- **Build**: Vite for fast development and optimized production builds

### Important Files & Directories
- `/src/components/` - Reusable UI components
- `/src/pages/` - Main page components (Dashboard, Market, Portfolio, Watchlist)
- `/src/context/` - React Context providers (Auth, Market)
- `/src/services/api.ts` - Mock API service (replace with real API)
- `/src/types/index.ts` - TypeScript type definitions
- `/src/utils/helpers.ts` - Utility functions

### Development Workflow
1. Run `npm run dev` to start development server
2. Components are in `/src/components/` directory
3. Pages are in `/src/pages/` directory
4. Add new features following the existing component structure
5. Use TypeScript interfaces from `/src/types/`

### Available npm Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter (if configured)

### Key Features Implemented
- User authentication (Login/Signup)
- Dashboard with portfolio overview
- Market view with stock browsing and searching
- Trading interface (Buy/Sell orders)
- Portfolio management and holdings tracking
- Watchlist for monitoring stocks
- Real-time price charts

### Mock Data
- 8 sample stocks with realistic market data
- Pre-populated portfolio with sample holdings
- Order history tracking
- Watchlist management

### Deployment Options
- **Vercel**: Recommended for Next.js or Vite apps
- **Netlify**: Drag & drop deployment
- **Docker**: For containerized deployment
- **Traditional Hosting**: Build and serve `/dist` folder

### Common Development Tasks

#### Adding a New Component
1. Create component in `/src/components/ComponentName.tsx`
2. Add interface to `/src/types/index.ts` if needed
3. Export from `/src/components/index.ts`
4. Import and use in pages

#### Adding a New Page
1. Create page in `/src/pages/PageName.tsx`
2. Add route in `/src/App.tsx`
3. Update Header navigation if needed

#### Modifying Mock Data
1. Edit `/src/services/api.ts` for stock data
2. Edit `/src/context/MarketContext.tsx` for portfolio data
3. Update type definitions in `/src/types/index.ts`

### Performance & Best Practices
- Use React.memo for expensive components
- Implement lazy loading for routes
- Use proper TypeScript types to prevent bugs
- Follow Tailwind CSS utility-first approach
- Keep components small and focused

### Important Notes
- All authentication is currently mocked - implement real backend for production
- Market data is simulated - integrate with real stock API
- localStorage is used for session management - use secure cookies in production
- Deploy sensitive data handling on backend only

### Debugging Tips
- Check React DevTools for component state
- Use browser console for errors
- Verify TypeScript compilation: `npm run build`
- Clear node_modules and reinstall if issues: `rm -rf node_modules && npm install`

### When to Contact Developer
- Database schema design needed
- Complex backend integration required
- Performance optimization for large datasets
- Security implementation for production
