import {
  ClientProviderOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { rabbitmqConfig } from '../env/files/rabbitmq.env.config';

const rabbitmqUrl = `amqp://${rabbitmqConfig().rabbitmq.username}:${rabbitmqConfig().rabbitmq.password}@${rabbitmqConfig().rabbitmq.host}`;

export const rabbitmqClientConfig: ClientProviderOptions = {
  name: rabbitmqConfig().rabbitmq.serviceName,
  transport: Transport.RMQ,
  options: {
    urls: [rabbitmqUrl],
    queue: rabbitmqConfig().rabbitmq.queueName,
    queueOptions: {
      durable: false,
    },
  },
};

export const rabbitmqServerConfig: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [rabbitmqUrl],
    queue: rabbitmqConfig().rabbitmq.queueName,
    queueOptions: {
      durable: false,
    },
    noAck: false,
  },
};
