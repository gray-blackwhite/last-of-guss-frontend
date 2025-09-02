import type { ApiGameSessionState } from "./api-game-session-state";
import type { ApiPlayerStat } from "./api-player-stat";

export type ApiGameSession = {
  readonly id: string;
  readonly createdAt: Date;
  readonly startsAt: Date;
  readonly endsAt: Date;
  readonly state: ApiGameSessionState;
  readonly players: ApiPlayerStat[];
  readonly winnerId: string | null;
  readonly winnerName: string | null;
  readonly winnerScore: number;
};
