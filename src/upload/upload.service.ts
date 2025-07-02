import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  async saveFilesLocally(files: Express.Multer.File[], userId: string) {
    const basePath = join(__dirname, 'storage', userId);

    if (!existsSync(basePath)) {
      mkdirSync(basePath, { recursive: true });
    }

    const savedFiles = [];

    for (const file of files) {
      const filename = `${Date.now()}-${file.originalname}`;
      const fullPath = join(basePath, filename);

      const stream = createWriteStream(fullPath);
      stream.write(file.buffer);
      stream.end();

      savedFiles.push({
        originalName: file.originalname,
        storedName: filename,
        path: fullPath,
        size: file.size,
        mimetype: file.mimetype,
      });
    }

    return {
      message: 'Files saved successfully',
      files: savedFiles,
    };
  }
}
