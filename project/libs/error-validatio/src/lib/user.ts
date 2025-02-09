export enum EnvValidationMessage {
  MongoUser = 'Specify the environment variable MONGO_USER in the file .env.',
  MongoPassword = 'Specify the environment variable MONGO_PASSWORD in the file .env.',
  MongoHost = 'Specify the environment variable HOST in the file .env.',
  MongoPort = 'Specify the environment variable MONGO_PORT in the file .env. The min value port 1000, max value port 6000',
  MongoDB = 'Specify the environment variable MONGO_DB in the file .env.',
  MongoAuthSource = 'Specify the environment variable MONGO_AUTH_SOURCE in the file .env.',
  Environment = 'Environment is required. Can be the following values: development, production, stage',
  Salt = 'Specify the environment variable SALT in the file .env.'
}
