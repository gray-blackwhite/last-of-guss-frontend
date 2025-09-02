import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";

export const useLoggedIn = () => {
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      nav("/login");
    }
  }, [isAuthenticated, nav]);

  return {}
}