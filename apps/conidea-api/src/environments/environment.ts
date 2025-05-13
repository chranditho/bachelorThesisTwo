/**
 * Development environment configuration for conidea-api
 * This file should not be committed to source control
 */

export const environment = {
  production: false,
  port: 3000,
  mongodb: {
    uri: 'mongodb://localhost:27017/conidea',
  },
  rabbitmq: {
    url: 'amqp://localhost:5672',
    queue: 'ideas_queue',
    queueOptions: { durable: false },
  },
  cors: {
    origin: '*',
  },
};
