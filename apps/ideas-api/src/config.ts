/**
 * Configuration for the ideas-api service
 * This file provides environment-based configuration for the service
 */

export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/conidea',
  },
  rabbitmq: {
    url: process.env.RMQ || 'amqp://localhost:5672',
    queue: 'ideas_queue',
    queueOptions: { durable: false },
  }
};
