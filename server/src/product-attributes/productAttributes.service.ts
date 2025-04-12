import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FilterRequest,
  MappedAttribute,
  RelevantAttributes,
} from '~/product-attributes/types';
import { PrismaService } from '~/prisma/prisma.service';
import { AttributeDto, CategoryIdsDto } from '~/product-attributes/dto';
import { Prisma } from '@prisma/client';
import { PageDto, PageMetaDto, PageOptionsDto } from '~/common/dtos';

@Injectable()
export class ProductAttributesService {
  constructor(private readonly prisma: PrismaService) {}

  async mapProductAttributes(
    inputAttributes: AttributeDto[],
    categoryId: string,
  ): Promise<MappedAttribute[]> {
    const categoryAttributes = await this.prisma.attributes.findMany({
      where: { categoryId },
      include: { attributeOptions: { include: { optionValue: true } } },
    });

    const attributesMap = new Map(
      categoryAttributes.map((attr) => [attr.name, attr]),
    );

    return inputAttributes.map(({ key, value }) => {
      const matchingAttribute = attributesMap.get(key);
      if (!matchingAttribute) {
        throw new BadRequestException(`Attribute ${key} not found`);
      }

      const optionsMap = new Map(
        matchingAttribute.attributeOptions.map((ao) => [
          ao.optionValue.value,
          ao,
        ]),
      );

      const matchingOption = optionsMap.get(value);
      if (!matchingOption) {
        throw new BadRequestException(`Value ${value} not found for ${key}`);
      }

      return {
        attributeId: matchingAttribute.id,
        optionValueId: matchingOption.optionValueId,
      };
    });
  }

  async getRelevantAttributes(
    categoryIds: CategoryIdsDto,
  ): Promise<RelevantAttributes[]> {
    return this.prisma.$queryRaw<RelevantAttributes[]>(Prisma.sql`
        SELECT a.name,
               ARRAY_AGG(DISTINCT ov.value) as "attributeOptions"
        FROM attributes a
                 JOIN attribute_options ao ON ao.attribute_id = a.id
                 JOIN option_values ov ON ov.id = ao.option_value_id
        WHERE a.category_id IN (${Prisma.join(categoryIds.categoryIds)})
        GROUP BY a.name
        ORDER BY a.name 
    `);
  }

  async filterByAttributes(
    attributes: FilterRequest,
    pageOptionsDto: PageOptionsDto,
  ) {
    if (!Object.keys(attributes).length) {
      throw new BadRequestException('Attributes filter cannot be empty');
    }

    const where: Prisma.ProductsWhereInput = {
      AND: Object.entries(attributes).map(([name, value]) => ({
        productAttributes: {
          some: {
            attribute: { name },
            optionValue: {
              value: Array.isArray(value) ? { in: value } : value,
            },
          },
        },
      })),
    };

    const [data, itemCount] = await Promise.all([
      this.prisma.products.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          categoryId: true,
          productImages: { select: { url: true } },
          price: true,
        },
        where,
      }),
      this.prisma.products.count({ where }),
    ]);

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(data, pageMetaDto);
  }
}
