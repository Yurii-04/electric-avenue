export interface ProductMainFields {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  productImages: Pick<ProductImages, 'url'>[];
  price: string;
}

export interface Seller {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  photo: string | null;
}

export interface Product extends Omit<ProductMainFields, 'categoryId' | 'productImages'> {
  seller: Seller;
  category: string;
  productAttributes: ProductAttribute[];
  productImages: ProductImages[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductAttribute {
  key: string;
  value: string;
}

export interface ProductImages {
  publicId: string;
  url: string;
}