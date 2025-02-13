export enum EnvValidationMessageForAppPublication {
  AppHost = 'Specify the environment variable HOST in the file .env in the Publication application',
  AppPort = 'Specify the environment variable PORT in the file .env in the Publication application. The min value port 1000, max value port 6000',
  Environment = 'Environment is required. Can be the following values: development, production, stage',
}

export enum EnvValidationMessageForDatabasePublication {
  PostgresHost = 'Specify the environment variable HOST in the file .env in the Publication application.',
  PostgresPort = 'Specify the environment variable POSTGRES_PORT in the file .env in the Publication application.',
  PostgresUsername = 'Specify the environment variable POSTGRES_USERNAME in the file .env in the Publication application. The min value port 1000, max value port 6000',
  PostgresPassword = 'Specify the environment variable POSTGRES_PASSWORD in the file .env in the Publication application.',
  PostgresDatabase = 'Specify the environment variable POSTGRES_DB in the file .env in the Publication application.'
}
