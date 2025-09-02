import type { ApiPlayerGameSession } from "./api-player-game-session";
import type { ApiUser } from "./api-user";

export type ApiPlayer = ApiUser & {
  readonly currentGame: ApiPlayerGameSession | null;
};
