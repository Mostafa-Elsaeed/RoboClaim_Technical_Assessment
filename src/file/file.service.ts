import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  consumingFileData(data: any) {
    console.log('File data consumed:', data);
  }
}
