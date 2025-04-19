import { Prisma, Products } from '@prisma/client';

export interface ProductWithAttributes
  extends Omit<Products, 'categoryId' | 'sellerId'> {
  productAttributes: { key: string; value: string }[];
  seller: Prisma.UsersGetPayload<{
    select: {
      id: true;
      firstName: true;
      lastName: true;
      createdAt: true;
      photo: true;
    };
  }>;
}

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
    seller: {
      select: {
        id: true;
        firstName: true;
        lastName: true;
        createdAt: true;
        photo: true;
      };
    };
    productAttributes: {
      select: {
        attribute: { select: { name: true } };
        optionValue: { select: { value: true } };
      };
    };
  };
  omit: { categoryId: true; sellerId: true };
}>;
