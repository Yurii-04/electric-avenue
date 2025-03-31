import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FilesValidationPipe implements PipeTransform {
  transform(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Files are required');
    }

    return files;
  }
}
