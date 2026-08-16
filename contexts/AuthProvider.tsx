"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  logout: async () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.log("Auth failed:", response.status);
          setUser(null);
          return;
        }

        const data = await response.json();

        console.log("Auth response:", data);

        // Change this depending on your API response
        setUser(data.user);
      } catch (error) {
        console.error("Failed to load user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error(error);
  } finally {
    setUser(null);
    router.push("/login");
  }
};


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);