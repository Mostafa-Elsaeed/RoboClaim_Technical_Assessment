import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { rabbitmqConstants } from 'src/configs/rabbit-mq/rabbit-mq.config';
import { FileData } from './file-data.type';

@Injectable()
export class UploadService {
  constructor(
    @Inject(rabbitmqConstants.serviceName) private rabbitmqClient: ClientProxy,
  ) {}
  async saveFilesLocally(files: Express.Multer.File[], userId: string) {
    const basePath = join(__dirname, '..', 'storage', userId);
    if (!existsSync(basePath)) mkdirSync(basePath, { recursive: true });

    const savedFiles = [];

    for (const file of files) {
      const filename = `${Date.now()}-${randomUUID()}-${file.originalname}`;
      const fullPath = join(basePath, filename);

      const stream = createWriteStream(fullPath);
      stream.write(file.buffer);
      stream.end();

      const fileData: FileData = {
        userId,
        originalName: file.originalname,
        storedName: filename,
        path: fullPath,
        size: file.size,
        mimetype: file.mimetype,
      };

      savedFiles.push(fileData);

      // Queue it
      this.rabbitmqClient.emit(rabbitmqConstants.queueName, fileData);
    }

    return {
      message: 'Files saved and jobs dispatched',
      files: savedFiles,
    };
  }
}
