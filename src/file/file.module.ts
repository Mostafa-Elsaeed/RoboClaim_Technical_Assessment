import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { UploadedFileEntity } from 'src/file/uploaded-file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UploadedFileEntity])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
