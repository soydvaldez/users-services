export type RoleType = "Admin" | "Editor" | "User" | "Viewer" | "Anonymous";

export interface UserAuthorization {
  email: string;
  password: string;
  roleType: RoleType;
}

export enum Role {
  ANONYMOUS = "Anonymous",
  ADMIN = "Admin",
  EDITOR = "Editor",
  USER = "User",
  VIEWER = "Viewer",
}

export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export type RecordRoleType = Record<RoleType, string[]>;

export const roleBasedRoutes: RecordRoleType = {
  Anonymous: ["/login", "/register"],
  Admin: ["/**"],
  Editor: ["/users/edit/**", "/roles/edit/**"],
  User: ["/profile", "/dashboard"],
  Viewer: ["/users", "/roles", "/users/{id}"],
};


