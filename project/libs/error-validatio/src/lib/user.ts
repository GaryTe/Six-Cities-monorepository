export enum EnvValidationMessageForDatabaseUser {
  MongoUser = 'Specify the environment variable MONGO_USER in the file .env in the Users application.',
  MongoPassword = 'Specify the environment variable MONGO_PASSWORD in the file .env in the Users application.',
  MongoHost = 'Specify the environment variable HOST in the file .env in the Users application.',
  MongoPort = 'Specify the environment variable MONGO_PORT in the file .env. The min value port 1000, max value port 6000',
  MongoDB = 'Specify the environment variable MONGO_DB in the file .env in the Users application.',
  MongoAuthSource = 'Specify the environment variable MONGO_AUTH_SOURCE in the file .env in the Users application.'
}

export enum EnvValidationMessageForAppUser {
  Host = 'Specify the environment variable HOST in the file .env in the Users application.',
  Port = 'Specify the environment variable PORT in the file .env in the Users application. The min value port 1000, max value port 6000',
  Environment = 'Environment is required. Can be the following values: development, production, stage',
  Salt = 'Specify the environment variable SALT in the file .env in the Users application.',
  JwtAlgorithm = 'Specify the environment variable JWT_ALGORITHM in the file .env in the Users application.',
  Typ = 'Specify the environment variable TYP in the file .env in the Users application.',
  JwtAccessExpired = 'Specify the environment variable JWT_ACCESS_EXPIRED in the file .env in the Users application.',
  StaticDirectory = 'Specify the environment variable STATIC_DIRECTORY in the file .env in the Users application.'
}

export const UserDtoValidationMessageForAppUser = {
  name: {
    string: `ValidationError: Type of field 'name' string`,
    length: `ValidationError: Length of field 'name' from 1 to 15`,
    typeData: `ValidationError: Vadi data should have the following view: 'Surname Name', field 'name'`
  },
  email: `ValidationError: Email introduced in the 'email' field is not valid.`,
  avatar: `ValidationError: The type of field 'avatar' does not correspond to the format .jpg or .png`,
  password: {
    string: `ValidationError: Type of field 'password' string`,
    length: `ValidationError: Length of field 'password' from 6 to 12`
  },
  typeUser: `ValidationError: The value of field 'typeUser' must correspond, one of the following values: 'ordinary' or 'pro'`
}
