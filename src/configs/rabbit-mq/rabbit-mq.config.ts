import {
  ClientProviderOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';

export const rabbitmqConstants = {
  queueName: process.env.RABBITMQ_QUEUE || 'file_processing_queue',
  serviceName: 'RABBITMQ_SERVICE',
  url: process.env.RABBITMQ_URL || 'amqp://guest:guest@192.168.1.201:5672',
};

export const rabbitmqClientConfig: ClientProviderOptions = {
  name: rabbitmqConstants.serviceName,
  transport: Transport.RMQ,
  options: {
    urls: [rabbitmqConstants.url],
    queue: rabbitmqConstants.queueName,
    queueOptions: {
      durable: false,
    },
  },
};

export const rabbitmqServerConfig: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [rabbitmqConstants.url],
    queue: rabbitmqConstants.queueName,
    queueOptions: {
      durable: false,
    },
    noAck: false,
  },
};
