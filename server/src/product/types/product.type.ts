import { Products } from '@prisma/client';

export type ProductWithAttributes = Omit<
  Products,
  'attributeValues' | 'categoryId'
> & {
  attributes: { key: string; value: string }[];
};

export type ProductMainFields = Pick<
  Products,
  'id' | 'title' | 'description' | 'price' | 'images'
>;
