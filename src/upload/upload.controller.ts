import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { getAllowedFileTypePattern } from './enum/allowed-types.enum';
import { User } from 'src/auth/custom-decorator/user-decorator';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          //   new MaxFileSizeValidator({ maxSize: 10000 }),
          new FileTypeValidator({ fileType: getAllowedFileTypePattern() }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
    @User('userId') userId,
  ) {
    // console.log('User ID:', userId);
    // console.log(files);
    return await this.uploadService.saveFilesLocally(files, userId);
  }
}
