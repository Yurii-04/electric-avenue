import { Module } from '@nestjs/common';
import { ProductAttributesService } from './productAttributes.service';
import { ProductAttributesController } from './productAttributes.controller';

@Module({
  controllers: [ProductAttributesController],
  providers: [ProductAttributesService],
  exports: [ProductAttributesService],
})
export class ProductAttributesModule {}
