/**
 * Production environment configuration for conidea-api
 * This file should be updated during the build process
 */

export const environment = {
  production: true,
  port: process.env.PORT || 3000,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/conidea',
  },
  rabbitmq: {
    url: process.env.RMQ || 'amqp://localhost:5672',
    queue: 'ideas_queue',
    queueOptions: { durable: false },
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  }
};
