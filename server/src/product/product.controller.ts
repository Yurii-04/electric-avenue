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
import { PageOptionsDto, PageOptionsWithoutSortingDto } from '~/common/dtos';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RequiredFilesPipe } from '~/common/pipes/files-validation.pipe';
import { FilterRequest } from '~/product/types';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      limits: { fileSize: MAX_FILE_SIZE },
    }),
  )
  async create(
    @Body() dto: CreateProductDto,
    @GetCurrentUserId() userId: string,
    @UploadedFiles(new RequiredFilesPipe()) files: Express.Multer.File[],
  ) {
    return this.productService.create(dto, userId, files);
  }

  @Public()
  @Get()
  async findProducts(
    @Query('category') categoryId: string,
    @Query('title') title: string,
    @Query('attributes') attributes: FilterRequest,
    @Query('page-options') pageOptionsDto: PageOptionsDto,
  ) {
    return this.productService.findProducts(
      { categoryId, title },
      pageOptionsDto,
      attributes,
    );
  }

  @Public()
  @Get('/search')
  async searchProducts(
    @Query('query') query: string,
    @Query('page-options') pageOptionsDto: PageOptionsWithoutSortingDto,
  ) {
    return this.productService.searchProducts(query, pageOptionsDto);
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
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      limits: { fileSize: MAX_FILE_SIZE },
    }),
  )
  async updateProduct(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetCurrentUserId() userId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productService.updateProduct(
      updateProductDto,
      productId,
      userId,
      files,
    );
  }
}
