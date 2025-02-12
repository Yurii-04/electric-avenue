import { ProductWithPagination } from '~/types';

export const defaultResponse: ProductWithPagination = {
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