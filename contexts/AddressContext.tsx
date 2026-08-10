"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "./AuthProvider";

type Address = {
  address_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  county:string;
  city:string;
  street:string;
  instructions:string;
};

type AddressContextType = {
  address: Address | null;
  loading: boolean;
  setAddress: React.Dispatch<React.SetStateAction<Address | null>>;
};

const AddressContext = createContext<AddressContextType>({
  address: null,
  loading: true,
  setAddress: () => {}
});

type AddressProviderProps = {
  children: ReactNode;
};

export function AddressProvider({ children }: AddressProviderProps) {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  

  useEffect(() => {
    
    const loadAddress = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/address`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.log("Auth failed:", response.status);
          setAddress(null);
          return;
        }

        const data = await response.json();

        console.log("Auth response:", data);

        // Change this depending on your API response
        setAddress(data.address);
      } catch (error) {
        console.error("Failed to load address:", error);
        setAddress(null);
      } finally {
        setLoading(false);
      }
    };

    loadAddress();
  }, []);



  return (
    <AddressContext.Provider
      value={{
        address,
        loading,
        setAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => useContext(AddressContext);