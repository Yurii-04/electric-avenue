import { ApiResponse, Product } from '~/types';

export type SearchParams = { query?: string };
export type ProductWithPagination = ApiResponse<Product>
