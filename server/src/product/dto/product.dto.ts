import {
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AttributeDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

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

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsArray()
  @ValidateNested()
  @Type(() => AttributeDto)
  attributes: AttributeDto[];
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
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  categoryId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imagesToDelete?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AttributeDto)
  attributes?: AttributeDto[];
}
