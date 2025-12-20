import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MarketProvider } from './context/MarketContext';
import { ThemeProvider } from './context/ThemeContext';
import { Login, Dashboard, Market, Portfolio, Watchlist } from './pages';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/market"
        element={
          <ProtectedRoute>
            <Market />
          </ProtectedRoute>
        }
      />
      <Route
        path="/portfolio"
        element={
          <ProtectedRoute>
            <Portfolio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <MarketProvider>
            <AppRoutes />
          </MarketProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
