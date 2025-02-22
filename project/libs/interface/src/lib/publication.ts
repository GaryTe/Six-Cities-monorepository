export interface ApplicationConfigPublicatin {
  host: string;
  port: number;
  environment: string;
  salt: string;
  staticDirectory: string;
}

export interface DatabaseConfigPublication {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
