import { AttributeValueDto } from '~/product/dto/attribute.dto';
import {
  ArrayNotEmpty,
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @Length(5, 50)
  title: string;

  @IsString()
  @Length(20, 500)
  description: string;

  @IsDecimal()
  @IsNotEmpty()
  price: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AttributeValueDto)
  attributes: AttributeValueDto[];
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(5, 50)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(20, 500)
  description?: string;

  @IsOptional()
  @IsDecimal()
  @IsNotEmpty()
  price?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  categoryId?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AttributeValueDto)
  attributes?: AttributeValueDto[];
}
