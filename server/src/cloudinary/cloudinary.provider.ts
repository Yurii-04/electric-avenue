import { v2 } from 'cloudinary';
import * as process from 'node:process';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUDNINARY_CLOUD_NAME,
      api_key: process.env.CLOUDNINARY_API_KEY,
      api_secret: process.env.CLOUDNINARY_API_SECRET,
    });
  },
};
