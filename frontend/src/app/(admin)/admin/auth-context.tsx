"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{ loggedIn: boolean }>({ loggedIn: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const user = localStorage.getItem("user"); // or token/cookie/etc.
  //   if (user) setLoggedIn(true);
  //   else router.push("/admin");
  // }, []);
  // console.log("AuthProvider rendered, loggedIn:", loggedIn);

  return (
    <AuthContext.Provider value={{ loggedIn }}>
      {loggedIn && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
