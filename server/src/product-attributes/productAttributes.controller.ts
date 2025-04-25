import { Controller, Get, Query } from '@nestjs/common';
import { ProductAttributesService } from './productAttributes.service';
import { Public } from '~/common/decorators';
import { CategoryIdsDto } from '~/product-attributes/dto';
import { PageOptionsDto } from '~/common/dtos';
import { FilterRequest } from '~/product-attributes/types';

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

  @Get('filter')
  @Public()
  async filterByAttributes(
    @Query('attributes') query: FilterRequest,
    @Query('page-options') pageOptionsDto: PageOptionsDto,
  ) {
    return this.productAttributesService.filterByAttributes(
      query,
      pageOptionsDto,
    );
  }
}
