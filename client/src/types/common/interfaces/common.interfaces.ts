import { Order } from '~/types';

export interface PaginationMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiResponse<T = unknown> {
  data: T[];
  meta: PaginationMeta;
}

export interface PageOptions {
  page: number;
  take: number;
  order: Order;
  orderBy: string;
}