import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";

export const useLoggedOut = () => {
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      nav("/");
    }
  }, [isAuthenticated, nav]);

  return {};
}