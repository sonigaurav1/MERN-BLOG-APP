import React, { useEffect } from "react";
import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children, isSignedIn }) {
    
  useEffect(() => {
    if (localStorage.getItem("token")) {
      isSignedIn = true;
    } else {
      isSignedIn = false;
    }
  }, []);

  const [user] = useState(isSignedIn ? { id: 1 } : null);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth provider must be used within the Auth Provider");
  }
  return context;
};
