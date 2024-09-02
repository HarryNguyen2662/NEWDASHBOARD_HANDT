import React, { createContext, useState, useEffect, PropsWithChildren } from 'react';
import { account, ID } from '../lib/appwrite';

interface User {
  $id: string;
  email: string;
  name?: string;
}

export interface AuthContextProps {
  loggedInUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const loggedIn = await account.get();
          setLoggedInUser(loggedIn);
        } catch (err) {
          setLoggedInUser(null);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
        try {
            await account.createEmailPasswordSession(email, password);
            const user = await account.get();
            setLoggedInUser(user);
            return { success: true };
        } catch (error: any) {
            console.error("Login failed", error);
            return { success: false, message: error.message };
        }
    };

    const register = async (email: string, password: string, name: string): Promise<{ success: boolean; message?: string }> => {
        try {
            await account.create(ID.unique(), email, password, name);
            return { success: true };
        } catch (error: any) {
            console.error("Registration failed", error);
            return { success: false, message: error.message };
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await account.deleteSession('current');
            setLoggedInUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ loggedInUser, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};