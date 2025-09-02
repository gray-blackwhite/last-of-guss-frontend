import type { ApiGameSession } from "./api-game-session";
import type { ApiPlayer } from "./api-player";

export type ApiGameSnapshot = {
  readonly player: ApiPlayer;
  readonly gameSessions: ApiGameSession[];
};
