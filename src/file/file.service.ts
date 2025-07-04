import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadedFileEntity } from './uploaded-file.entity';
import { Repository } from 'typeorm';
import { RmqContext } from '@nestjs/microservices';
import { FileData } from 'src/upload/file-data.type';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(UploadedFileEntity)
    private readonly uploadedFileRepository: Repository<UploadedFileEntity>,
  ) {}
  async consumingFileData(fileData: FileData, context: RmqContext) {
    console.log('File data consumed:', fileData);

    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      const fileRecord = this.uploadedFileRepository.create({
        userId: fileData.userId,
        originalName: fileData.originalName,
        storedName: fileData.storedName,
        path: fileData.path,
        size: fileData.size,
        mimetype: fileData.mimetype,
      });

      await this.uploadedFileRepository.save(fileRecord);
      console.log(`✅ File saved to DB: ${fileRecord.id}`);
    } catch (err) {
      console.error('❌ Error saving file to DB:', err);
    }

    channel.ack(message);
  }

  async getUserFiles(userId: string): Promise<UploadedFileEntity[]> {
    return this.uploadedFileRepository.find({
      where: { userId },
      order: { createdDate: 'DESC' },
    });
  }

  async getFileById(id: string): Promise<UploadedFileEntity> {
    const file = await this.uploadedFileRepository.findOne({
      where: { id },
    });

    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }

    return file;
  }
}
