import { Prisma, Products } from '@prisma/client';

export type ProductWithAttributes = Omit<Products, 'categoryId'> & {
  productAttributes: { key: string; value: string }[];
};

export type ProductMainFields = Pick<
  Products,
  'id' | 'title' | 'description' | 'price'
>;

export type Attribute = {
  key: string;
  value: string;
};

export type MappedAttribute = {
  attributeId: string;
  optionValueId: string;
};

export type Image = {
  url: string;
  publicId: string;
};

export type ProductWithRelations = Prisma.ProductsGetPayload<{
  include: {
    category: { select: { name: true } };
    productImages: { select: { url: true; publicId: true } };
    productAttributes: {
      select: {
        attribute: { select: { name: true } };
        optionValue: { select: { value: true } };
      };
    };
  };
  omit: {
    categoryId: true;
  };
}>;
