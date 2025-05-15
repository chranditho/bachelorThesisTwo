/**
 * Development environment configuration for users-api
 * This file should not be committed to source control
 */

export const environment = {
  production: false,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/conidea',
  },
  rabbitmq: {
    url: process.env.RMQ || 'amqp://localhost:5672',
    queue: 'users_queue',
    queueOptions: { durable: false },
  },
};
