import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CloudinaryModule } from '~/cloudinary/cloudinary.module';
import { ProductAttributesModule } from '~/product-attributes/productAttributes.module';

@Module({
  imports: [CloudinaryModule, ProductAttributesModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
