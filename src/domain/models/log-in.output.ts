import type { ApiUser } from "./api-user";

export type LogInOutput = {
  readonly token: string;
  readonly user: ApiUser;
};
