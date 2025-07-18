import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
// import { rabbitmqConstants } from 'src/configs/rabbit-mq/rabbit-mq.config';
import { UploadedFileEntity } from 'src/file/uploaded-file.entity';
import { Repository } from 'typeorm';
import { FileService } from './file.service';
import { User } from 'src/auth/custom-decorator/user-decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { rabbitmqConfig } from 'src/configs/env/files/rabbitmq.env.config';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @EventPattern(rabbitmqConfig().rabbitmq.queueName)
  async handleUploadedFile(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.fileService.consumingFileData(data, context);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUserFiles(@User('userId') userId) {
    return this.fileService.getUserFiles(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getFileById(@Param('id') id: string, @User('userId') userId) {
    return this.fileService.getFileById(id, userId);
  }
}
