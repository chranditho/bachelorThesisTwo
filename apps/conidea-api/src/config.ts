/**
 * Configuration for the conidea-api service
 * This file provides environment-based configuration for the service
 */

export const config = {
  port: process.env.PORT || 3000,
  rabbitmq: {
    url: process.env.RMQ || 'amqp://localhost:5672',
    queue: 'ideas_queue',
    queueOptions: { durable: false },
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
};
