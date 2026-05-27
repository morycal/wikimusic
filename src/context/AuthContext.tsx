"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  // load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("music-user");

    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // login
  const login = (email: string) => {
    const fakeUser = {
      name: "Music User",
      email,
    };

    localStorage.setItem(
      "music-user",
      JSON.stringify(fakeUser)
    );

    setUser(fakeUser);
  };

  // register
  const register = (name: string, email: string) => {
    const newUser = {
      name,
      email,
    };

    localStorage.setItem(
      "music-user",
      JSON.stringify(newUser)
    );

    setUser(newUser);
  };

  // logout
  const logout = () => {
    localStorage.removeItem("music-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return ctx;
}