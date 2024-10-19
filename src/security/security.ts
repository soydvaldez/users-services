import { UserAdapter } from "../user.map.js";
import { UserReponse, UserRol, Resource } from "./user.interface";

export const usersResponse: UserReponse[] = [
  {
    id: 1,
    username: "user1",
    email: "user1@domain.com",
    password: "",
    roles_id: [1, 3],
  },
  {
    id: 2,
    username: "user2",
    email: "user2@domain.com",
    password: "",
    roles_id: [1, 2, 3],
  },
  {
    id: 3,
    username: "user3",
    email: "user3@domain.com",
    password: "",
    roles_id: [2],
  },
];

export const roles: UserRol[] = [
  { id: 1, rol: "admin" },
  { id: 2, rol: "authenticated" },
  { id: 3, rol: "anonymous" },
];

export const resource: Resource[] = [
  { id: 1, name: "resource1", roles: [1] },
  { id: 2, name: "resource2", roles: [1, 2] },
  { id: 3, name: "resource3", roles: [1, 2, 3] },
];

const isAuthenticated = false;
const isAuthorized = false;

const userMapper = UserAdapter.mapUserResponseToUser(usersResponse[1]);
console.log({ ...userMapper });
console.log("script finalized!");
