import { useState, useCallback, useEffect } from "react";
import gameData from "../utils/game-data";
import httpClient from "../utils/http-client";
import type { ApiGameSession, ApiHitResult, ApiPlayer, JoinGameSessionInput } from "../domain/models";

export interface IGameApi {
  connect: () => void;
  disconnect: () => void;
  create: () => Promise<void>;
  join: (gameSessionId: string) => Promise<void>;
  leave: () => Promise<void>;
  hit: () => Promise<ApiHitResult | null>;
}

export interface IUseGameIntf {
  player: ApiPlayer | null;
  sessions: ApiGameSession[];
  isConnected: boolean,
  isReady: boolean,
  api: IGameApi,
}

async function create(): Promise<void> {
  try {
    return await httpClient.get("/create-game-session");
  } catch {
    // do nothing
  }
}

async function join(gameSessionId: string): Promise<void> {
  try {
    const payload: JoinGameSessionInput = {
      gameSessionId,
    }
    await httpClient.post("/join-game-session", payload);
  } catch {
    // do nothing;
  }
}

async function leave(): Promise<void> {
  try {
    await httpClient.get("/leave-game-session");
  } catch {
    // do nothing;
  }
}

async function hit(): Promise<ApiHitResult | null> {
  try {
    return await httpClient.get("/hit");
  } catch {
    return null;
  }
}

export const useGame: () => IUseGameIntf = () => {

  const [b, setB] = useState<boolean>(false)

  const rerender = useCallback(() => {
    setB(!b)
  }, [b])

  useEffect(() => {
    gameData.subscribe(rerender)
    return () => {
      gameData.unsubscribe(rerender)
    }
  })

  const { gameSessions, isConnected, player } = gameData.getData();

  const intf: IUseGameIntf = {
    player: player,
    sessions: gameSessions || [],
    isConnected,
    isReady: (player) ? true : false,
    api: {
      connect: () => gameData.connect(),
      disconnect: () => gameData.disconnect(),
      create: create,
      join: join,
      leave: leave,
      hit: hit,
    }
  }

  return intf;
}