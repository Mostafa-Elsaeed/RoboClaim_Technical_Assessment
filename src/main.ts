import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

// Local Imports
import { AppModule } from './app.module';
import { catchErrors } from './global-helpers/catch-errors';
import { Transport } from '@nestjs/microservices';

async function startApp() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@192.168.1.201:5672'],
      queue: 'file_processing_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  Logger.log('RabbitMQ Microservice is running');
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}

async function bootstrap() {
  const [app, error] = await catchErrors(() => startApp());

  if (error) {
    Logger.error('Error starting application:', error);
    process.exit(1);
  }
}

bootstrap();
