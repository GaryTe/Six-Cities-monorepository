export enum EnvValidationMessageForAppPublication {
  AppHost = 'Specify the environment variable HOST in the file .env in the Publication application',
  AppPort = 'Specify the environment variable PORT in the file .env in the Publication application. The min value port 1000, max value port 6000',
  Environment = 'Environment is required. Can be the following values: development, production, stage',
  Salt = 'Specify the environment variable SALT in the file .env in the Publication application.',
  StaticDirectory = 'Specify the environment variable STATIC_DIRECTORY in the file .env in the Publication application.'
}

export enum EnvValidationMessageForDatabasePublication {
  PostgresHost = 'Specify the environment variable HOST in the file .env in the Publication application.',
  PostgresPort = 'Specify the environment variable POSTGRES_PORT in the file .env in the Publication application.',
  PostgresUsername = 'Specify the environment variable POSTGRES_USERNAME in the file .env in the Publication application. The min value port 1000, max value port 6000',
  PostgresPassword = 'Specify the environment variable POSTGRES_PASSWORD in the file .env in the Publication application.',
  PostgresDatabase = 'Specify the environment variable POSTGRES_DB in the file .env in the Publication application.'
}

export const CreateCommentDtoValidationMessageForPublication = {
  text: {
    string: `ValidationError: Type of field 'text' string`,
    length: `ValidationError: Length of field 'text' from 5 to 1024`
  },
  rating: {
    namber: `ValidationError: Type of field 'rating' number`,
    minNamber: `ValidationError: The min number of field 'rating' 1.`,
    manNamber: `ValidationError: The max number of field 'rating' 5.`
  },
}

export const CreateRentDtoValidationMessageForPublication = {
  name: {
    string: `ValidationError: Type of field 'name' string`,
    length: `ValidationError: Length of field 'name' from 10 to 100`
  },
  desctiption: {
    string: `ValidationError: Type of field 'description' string`,
    length: `ValidationError: Length of field 'description' from 20 to 1024`
  },
  city: `ValidationError: The value of field 'city' must correspond, one of the following values: 'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'`,
  preverteringImage: `ValidationError: The field 'city', link to the image.`,
  photosHousing: {
    string: `ValidationError: Type array of field 'photosHousing' = string[]`,
    length: `ValidationError: Length array of field 'photosHousing' = 6`
  },
  premium: `ValidationError: Type of field 'premium' is boolean`,
  favorites: `ValidationError: Type of field 'favorites' is boolean`,
  typeHousing: `ValidationError: The value of field 'typeHousing' must correspond, one of the following values: 'apartment', 'house', 'room', 'hotel'`,
  numberRoom: {
    namber: `ValidationError: Type of field 'numberRoom' number`,
    minNamber: `ValidationError: The min number of field 'numberRoom' = 1.`,
    manNamber: `ValidationError: The max number of field 'numberRoom' = 8.`
  },
  numberGuest: {
    namber: `ValidationError: Type of field 'numberGuest' number`,
    minNamber: `ValidationError: The min number of field 'numberGuest' = 1.`,
    manNamber: `ValidationError: The max number of field 'numberGuest' = 10.`
  },
  priceRent: {
    namber: `ValidationError: Type of field 'priceRent' number`,
    minNamber: `ValidationError: The min number of field 'priceRent' = 100.`,
    manNamber: `ValidationError: The max number of field 'priceRent' = 100 000.`
  },
  comfort: {
    type: `ValidationError: Type array of field 'comfort' = string[]`,
    values: `ValidationError: The value of field 'comfort' must correspond, the following values: 'Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'`
  },
  coordinates: {
    length: `ValidationError: Length array of field 'coordinates' = 2`,
    type: `ValidationError: Type array of field 'coordinates' = [number, number]`
  }
}
