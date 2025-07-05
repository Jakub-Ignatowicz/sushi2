"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authMe } from "@/lib/api/auth";
import { toast } from "sonner";

const AuthContext = createContext<{ loggedIn: boolean }>({ loggedIn: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        await authMe();
        setLoggedIn(true);
      } catch (error) {
        toast.error(
          "Nie masz uprawnień do tej strony. Zaloguj się jako administrator.",
        );
        router.push("/admin");
      }
    };

    fetchMe();
  }, []);

  if (!loggedIn) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ loggedIn }}>
      {loggedIn && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
