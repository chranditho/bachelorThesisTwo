/**
 * Production environment configuration for users-api
 * This file should be updated during the build process
 */

export const environment = {
  production: true,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/conidea',
  },
  rabbitmq: {
    url: process.env.RMQ || 'amqp://localhost:5672',
    queue: 'users_queue',
    queueOptions: { durable: false },
  },
};
