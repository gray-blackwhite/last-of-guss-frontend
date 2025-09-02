import type { ApiPlayer, ApiGameSession, ApiGameSnapshot } from "../domain/models";
import authData from "./auth-data";
import { Observer } from "./observer";
import { getUrl } from "./utils";
import { EventSourcePolyfill } from "event-source-polyfill";

type ConnectionEvent = { status: number } & MessageEvent;

type GameData = {
  player: ApiPlayer | null;
  gameSessions: ApiGameSession[];
  isConnected: boolean;
}

const observer = new Observer<GameData>("Game Data", () => ({ gameSessions: [], player: null, isConnected: false }));
let eventSource: EventSource | undefined = undefined;

function connect(): void {
  console.log("Connect")
  const url = getUrl('/sse');
  eventSource = new EventSourcePolyfill(url, {
    headers: {
      "Authorization": `Bearer ${authData.getToken()}`
    }
  });

  if (!eventSource) {
    return;
  }

  eventSource.addEventListener("open", () => {
    observer.processData(data => {
      const oldValue = data.isConnected
      data.isConnected = true;
      return oldValue != data.isConnected;
    })
  })

  eventSource.addEventListener("error", (event: MessageEvent) => {
    const connectionEvent = event as ConnectionEvent;
    if (connectionEvent.status === 401) {
      authData.unauthenticate();
    }

    eventSource?.close();

    observer.processData(data => {
      const oldValue = data.isConnected
      data.isConnected = false;
      return oldValue != data.isConnected;
    })
  })

  eventSource.addEventListener("message", (event: MessageEvent) => {
    try {
      const snapshot = JSON.parse(event.data) as ApiGameSnapshot;
      observer.processData(data => {
        data.gameSessions = snapshot.gameSessions;
        data.player = snapshot.player;
        return true;
      })
    } catch (e) {
      console.error("Error parsing message", e, event.data, event);
    }
  })
}

function getData(): GameData {
  return observer.getData();
}

function disconnect(): void {
  console.log("Disconnect");
  if (!eventSource) {
    return;
  }

  eventSource.close();
  eventSource = undefined;
}

export default {
  subscribe: observer.subscribe,
  unsubscribe: observer.unsubscribe,
  connect,
  disconnect,
  getData,
}
