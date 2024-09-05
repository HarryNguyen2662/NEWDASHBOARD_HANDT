import { useContext } from "react";
import { AuthContext, type AuthContextProps } from "../context/AuthContext";

// Custom hook to use the AuthContext and ensure it is not undefined
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
