import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { rabbitmqConstants } from 'src/configs/rabbit-mq/rabbit-mq.config';
import { UploadedFileEntity } from 'src/file/uploaded-file.entity';
import { Repository } from 'typeorm';
import { FileService } from './file.service';

@Controller()
export class FileController {
  constructor(
    @InjectRepository(UploadedFileEntity)
    private readonly fileRepo: Repository<UploadedFileEntity>,

    private readonly fileService: FileService,
  ) {}

  @EventPattern(rabbitmqConstants.queueName)
  async handleUploadedFile(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    this.fileService.consumingFileData(data);
    channel.ack(originalMessage);

    // channel.nack(originalMessage, false, true);

    // const channel = context.getChannelRef();
    // const message = context.getMessage();

    // try {
    //   const fileBuffer = readFileSync(data.path);
    //   const extractedText = fileBuffer.toString().substring(0, 500); // simulate preview text

    //   const fileRecord = this.fileRepo.create({
    //     userId: data.userId,
    //     originalName: data.originalName,
    //     storedName: data.storedName,
    //     path: data.path,
    //     size: data.size,
    //     mimetype: data.mimetype,
    //     extractedText,
    //   });

    //   await this.fileRepo.save(fileRecord);
    //   console.log(`✅ File saved to DB: ${fileRecord.id}`);
    // } catch (err) {
    //   console.error('❌ Error saving file to DB:', err);
    // }

    // channel.ack(message);
  }
}
