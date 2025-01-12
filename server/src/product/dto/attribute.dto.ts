import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class AttributeValueDto {
  @Type(() => Number)
  @IsNumber()
  attributeId: number;

  @IsString()
  value: string;
}
