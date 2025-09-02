import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useGame } from "./useGame";

export const useConnection = () => {

  const { isAuthenticated } = useAuth();
  const {
    isConnected,
    api: { connect, disconnect },
  } = useGame();

  useEffect(() => {
    if (isAuthenticated) {
      if (!isConnected) {
        connect();
      }
    } else {
      if (isConnected) {
        disconnect();
      }
    }
  }, [connect, disconnect, isAuthenticated, isConnected]);

  return {}
}