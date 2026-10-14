import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';

export interface IStorageService {
  saveFile(file: Express.Multer.File): Promise<string>;
  deleteFile(fileUrl: string): Promise<void>;
}

@Injectable()
export class LocalStorageService implements IStorageService {
  private readonly logger = new Logger(LocalStorageService.name);
  private readonly uploadDir = path.resolve(process.cwd(), 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const filename = `${randomUUID()}${ext}`;
    const targetPath = path.join(this.uploadDir, filename);

    await fs.promises.writeFile(targetPath, file.buffer);
    this.logger.log(`Saved file to ${targetPath}`);

    // Return the relative public path (served via static assets)
    return `/uploads/${filename}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      if (!fileUrl || !fileUrl.startsWith('/uploads/')) {
        // Not a local disk file (e.g. external seed URL), skip disk deletion
        return;
      }

      const filename = path.basename(fileUrl);
      const targetPath = path.join(this.uploadDir, filename);

      if (fs.existsSync(targetPath)) {
        await fs.promises.unlink(targetPath);
        this.logger.log(`Deleted file: ${targetPath}`);
      }
    } catch (error) {
      this.logger.warn(`Failed to delete file: ${fileUrl}`, error);
    }
  }
}
