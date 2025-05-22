import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as streamifier from 'streamifier';
import { Image } from '~/product/types';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          resource_type: 'image',
          transformation: {
            width: 800,
            height: 600,
            // crop: 'cover',
          },
        },
        (error, result) => {
          if (error) return reject(new BadRequestException(error.message));
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(upload);
    });
  }

  async uploadImages(files: Express.Multer.File[]): Promise<Image[]> {
    if (!files || files.length === 0) return [];
    const result = await Promise.all(
      files.map((file) => this.uploadImage(file)),
    );
    return result.map((res) => ({
      url: res.secure_url,
      publicId: res.public_id,
    }));
  }

  async deleteImages(publicIds: string[]) {
    if (publicIds.length === 0) return;
    await v2.api.delete_resources(publicIds, { invalidate: true });
  }
}
