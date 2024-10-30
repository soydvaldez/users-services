export interface UserResponse {
  id: number;
  username: string;
  email: string;
  password: string;
  roles_id: number[];
}

export interface UserRequest {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: string[];
}

export interface UserRequestSignIn {
  email: string;
  password: string;
}

export interface UserRole {
  id: number;
  rol: string;
}

export interface Resource {
  id: number;
  name: string;
  roles: number[];
}
