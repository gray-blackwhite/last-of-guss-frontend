import type { ApiUser } from "../domain/models";
import { Observer } from "./observer";

type Values = {
  accessToken: string | null;
  user: ApiUser | null;
}

const observer = new Observer<Values>("Auth Data", () => ({ accessToken: null, user: null }));

function authenticate(accessToken: string, user: ApiUser): void {
  observer.processData(values => {
    if (values.accessToken === accessToken) {
      return false;
    }

    values.accessToken = accessToken;
    values.user = user;

    localStorage.setItem("auth", JSON.stringify(values));
    return true;
  })
}

function unauthenticate(): void {
  observer.processData(values => {
    if (!values.accessToken) {
      return false;
    }

    values.accessToken = null;
    values.user = null;
    localStorage.removeItem("auth");
    return true;
  })
}

function getUser(): ApiUser | null {
  return observer.getData().user;
}

function getToken(): string | null {
  return observer.getData().accessToken;
}


(function (): void {
  try {
    const value = localStorage.getItem("auth");
    if (value) {
      const data = JSON.parse(value) as Values;
      if (data.accessToken && data.user) {
        authenticate(data.accessToken, data.user);
      }
    }
  } catch (e) {
    console.error("Error", e);
  }
})();

export default {
  subscribe: observer.subscribe,
  unsubscribe: observer.unsubscribe,
  authenticate,
  unauthenticate,
  getUser,
  getToken
}