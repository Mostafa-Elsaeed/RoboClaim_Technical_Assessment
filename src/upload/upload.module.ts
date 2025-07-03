import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
