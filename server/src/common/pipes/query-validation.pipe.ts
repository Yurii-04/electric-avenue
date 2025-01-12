import { BadRequestException, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class QueryValidationPipe<T extends object> implements PipeTransform {
  constructor(private readonly type: new () => T) {}

  async transform(value: unknown): Promise<T> {
    const object = plainToInstance(this.type, value, {
      enableImplicitConversion: true,
    });
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return object;
  }
}
