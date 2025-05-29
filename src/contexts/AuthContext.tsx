import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'consumer' | 'business';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, userType: 'consumer' | 'business') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // In a real application, you would make an API call here
    // This is just a mock implementation for the frontend
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          id: '1',
          name: 'Demo User',
          email,
          userType: email.includes('business') ? 'business' : 'consumer',
        });
        resolve();
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string, userType: 'consumer' | 'business') => {
    // In a real application, you would make an API call here
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({
          id: '1',
          name,
          email,
          userType,
        });
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};