import { Prisma, Products } from '@prisma/client';

export type ProductWithAttributes = Omit<Products, 'categoryId'> & {
  productAttributes: { key: string; value: string }[];
};

export type ProductWithImages = Prisma.ProductsGetPayload<{
  select: {
    id: true;
    title: true;
    description: true;
    categoryId: true;
    price: true;
    productImages: {
      select: {
        url: true;
      };
    };
  };
}>;

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
