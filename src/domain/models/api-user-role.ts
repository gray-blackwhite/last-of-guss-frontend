export const ApiUserRoles = {
  Admin: "admin",
  Nikita: "nikita",
  Regular: "regular",
} as const;

type ApiUserRoleType = typeof ApiUserRoles;
export type ApiUserRole = ApiUserRoleType[keyof ApiUserRoleType];
