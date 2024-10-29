import { User } from "./user.interface";

export interface Role {
  id?: number;
  name: string;
  users: User[];
}
