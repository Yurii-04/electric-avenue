import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParseJsonPipe implements PipeTransform {
  transform(value: string) {
    if (typeof value === 'object') {
      return value;
    }
    if (!value) {
      return {};
    }

    try {
      return JSON.parse(value);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
