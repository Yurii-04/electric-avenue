import { Controller, Get, Query } from '@nestjs/common';
import { ProductAttributesService } from './productAttributes.service';
import { Public } from '~/common/decorators';
import { CategoryIdsDto } from '~/product-attributes/dto';

@Controller('product-attributes')
export class ProductAttributesController {
  constructor(
    private readonly productAttributesService: ProductAttributesService,
  ) {}

  @Get()
  @Public()
  async getRelevantAttributes(@Query() query: CategoryIdsDto) {
    return this.productAttributesService.getRelevantAttributes(query);
  }
}
