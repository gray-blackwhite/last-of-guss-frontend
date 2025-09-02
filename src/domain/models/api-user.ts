import type { ApiUserRole } from "./api-user-role";

export type ApiUser = {
  readonly name: string;
  readonly role: ApiUserRole;
};
