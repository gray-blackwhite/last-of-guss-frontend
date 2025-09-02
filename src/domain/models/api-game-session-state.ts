export const ApiGameSessionStates = {
  Cooldown: "cooldown",
  Active: "active",
  Finished: "finished",
} as const;

type ApiGameSessionStateType = typeof ApiGameSessionStates;
export type ApiGameSessionState = ApiGameSessionStateType[keyof ApiGameSessionStateType];
