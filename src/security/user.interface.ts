export interface UserReponse {
  id: number;
  username: string;
  email: string;
  password: string;
  roles_id: number[];
}

export interface UserRol {
  id: number;
  rol: string;
}

export interface Resource {
  id: number;
  name: string;
  roles: number[];
}
