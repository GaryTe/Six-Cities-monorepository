export enum EnvValidationMessageForRabbitMQ {
  User = 'Specify the environment variable RABBITMQ_USER in the file .env in the project/.env.',
  Password = 'Specify the environment variable RABBITMQ_PASSWORD in the file .env in the project/.env.',
  Host = 'Specify the environment variable RABBITMQ_HOST in the file .env in the project/.env.',
  Port = 'Specify the environment variable RABBITMQ_PORT in the file .env in the project/.env. The min value port 1000, max value port 6000',
}
