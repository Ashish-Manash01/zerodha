import React, { createContext, useContext, useState, useCallback } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = useCallback(async (email: string, _password: string) => {
    // Simulated login - replace with actual API call
    const mockUser: UserProfile = {
      id: '1',
      name: 'Ashish Kumar',
      email,
      accountNumber: 'ZDH123456',
      joinDate: new Date('2023-01-15'),
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    // Simulated signup - replace with actual API call
    const newUser: UserProfile = {
      id: Date.now().toString(),
      name,
      email,
      accountNumber: `ZDH${Math.random().toString().substring(2, 8)}`,
      joinDate: new Date(),
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
