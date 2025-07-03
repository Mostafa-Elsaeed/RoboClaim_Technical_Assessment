import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitmqClientConfig } from 'src/configs/rabbit-mq/rabbit-mq.config';

@Global()
@Module({
  imports: [ClientsModule.register([rabbitmqClientConfig])],
  exports: [ClientsModule],
})
export class RabbitmqModule {}
