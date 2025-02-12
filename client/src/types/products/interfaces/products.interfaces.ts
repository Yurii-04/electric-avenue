import { PaginationMeta } from '~/types';

export interface Product {
  id: string
  title: string
  description: string
  images: string[]
  price: string
}

export interface ProductWithPagination  {
  data: Product[];
  meta: PaginationMeta;
}
