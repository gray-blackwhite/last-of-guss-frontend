import { useCallback, useEffect, useState } from "react";
import authData from "../utils/auth-data";
import httpClient from "../utils/http-client"
import type { ApiUser, LogInInput, LogInOutput } from "../domain/models";

export interface IClientApi {
  login: (username: string, password: string) => Promise<ApiUser>,
  logout(): Promise<void>
}

export interface IUseClientIntf {
  readonly isAuthenticated: boolean;
  readonly user: ApiUser | null;
  readonly api: IClientApi
}

async function login(username: string, password: string): Promise<ApiUser> {
  const payload: LogInInput = {
    password: password,
    username: username,
  }

  const result = await httpClient.post<LogInInput, LogInOutput>("/auth/login", payload);
  if (!result?.token || !result?.user) {
    throw new Error("Invalid response from server");
  }

  authData.authenticate(result.token, result.user);

  return result.user;
}

async function logout(): Promise<void> {
  try {
    await httpClient.get("/auth/logout");
  } catch {
    // do nothing;
  }

  authData.unauthenticate();
}

export const useAuth: () => IUseClientIntf = () => {

  const [b, setB] = useState<boolean>(false)

  const rerender = useCallback(() => {
    setB(!b)
  }, [b])

  useEffect(() => {
    authData.subscribe(rerender)
    return () => {
      authData.unsubscribe(rerender)
    }
  })

  const user = authData.getUser();

  const intf: IUseClientIntf = {
    isAuthenticated: !!user,
    user: user,
    api: {
      login: login,
      logout: logout
    }
  }

  return intf;
}