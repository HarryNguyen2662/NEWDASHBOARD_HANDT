import React, {
  createContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import { supabase } from "../lib/Backend/supabase";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthContextProps {
  loggedInUser: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setLoggedInUser(
          session.user
            ? { ...session.user, email: session.user.email || "" }
            : null
        );
      } else {
        setLoggedInUser(null);
      }
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          setLoggedInUser(
            session.user
              ? { ...session.user, email: session.user.email || "" }
              : null
          );
        } else {
          setLoggedInUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data);
    if (error) {
      console.error("Login failed", error);
      return { success: false, message: error.message };
    }
    setLoggedInUser(
      data.user ? { ...data.user, email: data.user.email || "" } : null
    );
    return { success: true, message: data.user?.email || "" };
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; message?: string }> => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) {
      console.error("Registration failed", error);
      return { success: false, message: error.message };
    }
    setLoggedInUser(
      data.user ? { ...data.user, email: data.user.email || "" } : null
    );
    return { success: true, message: data.user?.email || "" };
  };

  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed", error);
    } else {
      setLoggedInUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedInUser, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
