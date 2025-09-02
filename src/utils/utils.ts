import { ApiUserRoles, type ApiUserRole } from "../domain/models";

export const getEnvVariable = (name: string, defaultValue: string | null = null): string => {
  const value = import.meta.env[name];
  if (!value && !defaultValue) {
    throw new Error(`${name} is not defined`);
  }

  return value || defaultValue;
}

export const getUrl = (path: string) => {
  const apiEndpoint = getEnvVariable("VITE_API_ENDPOINT");
  return `${apiEndpoint}${path}`;
}

const userRolesMap: Record<ApiUserRole, string> = {
  [ApiUserRoles.Admin]: "Admin",
  [ApiUserRoles.Nikita]: "Nikita",
  [ApiUserRoles.Regular]: "Regular",
};

export const userFriendlyRoleName = (role: ApiUserRole | undefined) => {
  return (role && userRolesMap[role]) || "Unknown Guss";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function trapEvents(e: any) {
  e.preventDefault();
  e.stopPropagation();
}