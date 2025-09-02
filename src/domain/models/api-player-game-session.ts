import type { ApiGameSessionState } from "./api-game-session-state";
import type { ApiPlayerStat } from "./api-player-stat";

export type ApiPlayerGameSession = {
  readonly id: string;
  readonly createdAt: Date;
  readonly startsAt: Date | null;
  readonly endsAt: Date | null;
  readonly state: ApiGameSessionState;
  readonly stat: ApiPlayerStat | null;
  readonly winnerId: string | null;
  readonly winnerName: string | null;
  readonly winnerScore: number;
};
