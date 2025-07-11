import { createContext } from 'react';

export const AuthContext = createContext();
export const useAuth = () => ({ user: null });
export const AuthProvider = ({ children }) => children;