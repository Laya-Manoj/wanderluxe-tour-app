import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Types
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  { 
    id: '1', 
    email: 'admin@wanderluxe.com', 
    name: 'Admin User', 
    role: 'admin' 
  },
  { 
    id: '2', 
    email: 'user@example.com', 
    name: 'Regular User', 
    role: 'user' 
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock implementation - in a real app, this would call an API
    setLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        
        if (user && password === 'password') { // Mock password check
          setCurrentUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1000); // Simulate API delay
    });
  };

  const register = async (email: string, password: string, name: string) => {
    // This is a mock implementation - in a real app, this would call an API
    setLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          setLoading(false);
          reject(new Error('Email already exists'));
        } else {
          const newUser: User = {
            id: `${mockUsers.length + 1}`,
            email,
            name,
            role: 'user'
          };
          
          // In a real app, this would be handled by the backend
          mockUsers.push(newUser);
          setCurrentUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          setLoading(false);
          resolve();
        }
      }, 1000); // Simulate API delay
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = currentUser?.role === 'admin';

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};