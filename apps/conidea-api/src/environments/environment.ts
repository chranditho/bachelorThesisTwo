/**
 * Development environment configuration for conidea-api
 * This file should not be committed to source control
 */

export const environment = {
  production: false,
  port: process.env.PORT || 3000,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/conidea',
  },
  rabbitmq: {
    url: process.env.RMQ || 'amqp://localhost:5672',
    ideas_queue: 'ideas_queue',
    users_queue: 'users_queue',
    queueOptions: { durable: false },
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
};
