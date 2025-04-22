import { Product } from '~/types';

export const defaultResponse = {
  data: [],
  meta: {
    page: 1,
    take: 10,
    itemCount: 1,
    pageCount: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};

export const defaultProductResponse: Product = {
  id: '',
  seller: {
    id: '',
    firstName: '',
    lastName: '',
    createdAt: '',
    photo: ''
  },
  description: '',
  productImages: [],
  productAttributes: [],
  createdAt: '',
  updatedAt: '',
  category: '',
  price: '',
  title: '',
};