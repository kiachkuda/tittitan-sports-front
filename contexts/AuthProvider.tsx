"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {env} from "node:process"

type AuthContextType = {
  user: any;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: (() => {}) as React.Dispatch<React.SetStateAction<any>>
});

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(process.env.NEXT_PUBLIC_API_URI)
    async function loadUser() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`,
          {
            method:"GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          setLoading(false);
          return; 
        }

        const data = await response.json();
        console.log("User loaded:", data);

        setUser(data.user);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);