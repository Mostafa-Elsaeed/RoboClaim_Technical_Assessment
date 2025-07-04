import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

// Local Imports
import { AppModule } from './app.module';
import { catchErrors } from './global-helpers/catch-errors';
import { Transport } from '@nestjs/microservices';
import { rabbitmqServerConfig } from './configs/rabbit-mq/rabbit-mq.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function startApp() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('File Upload API')
    .setDescription('API for managing file uploads and processing')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.connectMicroservice(rabbitmqServerConfig);

  await app.startAllMicroservices();
  Logger.log('RabbitMQ Microservice is running');
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
  Logger.log(`Swagger Docs is running on: http://localhost:${port}/api/docs`);
}

async function bootstrap() {
  const [app, error] = await catchErrors(() => startApp());

  if (error) {
    Logger.error('Error starting application:', error);
    process.exit(1);
  }
}

bootstrap();
