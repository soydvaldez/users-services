export interface APP_PROPERTIES {
  port: number;
  host: string;
}

export interface DB_PROPERTIES {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export interface AUTH_PROPERTIES {
  jwt_secret_key: string;
}
