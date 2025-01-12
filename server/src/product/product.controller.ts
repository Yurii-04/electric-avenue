import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from '~/product/dto';
import { GetCurrentUserId, Public } from '~/common/decorators';
import { PageOptionsDto } from '~/common/dtos';
import { ParseJsonPipe, QueryValidationPipe } from '~/common/pipes';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Products } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() dto: CreateProductDto,
    @GetCurrentUserId() userId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Products> {
    return this.productService.create(dto, userId, files);
  }

  @Public()
  @Get()
  async getAll(
    @Query(
      'page-options',
      new ParseJsonPipe(),
      new QueryValidationPipe(PageOptionsDto),
    )
    pageOptionsDto: PageOptionsDto,
  ) {
    return this.productService.getAll(pageOptionsDto);
  }

  @Public()
  @Get('/search')
  async getByCategory(
    @Query('category') categoryName: string,
    @Query(
      'page-options',
      new ParseJsonPipe(),
      new QueryValidationPipe(PageOptionsDto),
    )
    pageOptionsDto: PageOptionsDto,
  ) {
    return this.productService.getByCategory(categoryName, pageOptionsDto);
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') productId: string) {
    return this.productService.getById(productId);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id') productId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.productService.deleteProduct(productId, userId);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  async updateProduct(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetCurrentUserId() userId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Products> {
    return this.productService.updateProduct(
      updateProductDto,
      productId,
      userId,
      files,
    );
  }
}
