export interface DatabaseConfigUser {
  userName: string;
  password: string;
  host: string;
  port: number;
  dataBase: string;
  authSource: string;
}

export interface ApplicationConfigUser {
  host: string;
  port: number;
  environment: string;
  salt: string;
}
