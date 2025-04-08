import { IsArray, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CategoryIdsDto {
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsString({ each: true })
  categoryIds: string[];
}

export class AttributeDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}
