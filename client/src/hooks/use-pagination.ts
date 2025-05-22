import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Order } from '~/types';

interface UsePaginationOptions {
  defaultPage?: number;
  defaultOrderBy?: string;
  defaultOrder?: Order;
  take?: number;
}

interface PaginationParams {
  page: number;
  orderBy?: string;
  order?: Order;
  take?: number;
}

export const usePagination = (options: UsePaginationOptions = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    defaultPage = 1,
    defaultOrderBy = 'createdAt',
    defaultOrder = Order.DESC,
    take = 12,
  } = options;

  const currentPage = searchParams.get('page-options[page]')
    ? Number(searchParams.get('page-options[page]'))
    : defaultPage;

  const currentOrderBy = searchParams.get('page-options[orderBy]') ?? defaultOrderBy;
  const currentOrder = (searchParams.get('page-options[order]') as Order) || defaultOrder;

  const getPaginationParams = useCallback((): PaginationParams => ({
    page: currentPage,
    take: take,
    orderBy: currentOrderBy,
    order: currentOrder,
  }), [currentPage, currentOrder, currentOrderBy, take]);

  const handlePageChange = useCallback((page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page-options[page]', page.toString());
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const handleSortFieldChange = useCallback((orderBy: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page-options[orderBy]', orderBy);
    newParams.set('page-options[page]', '1');
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const handleSortOrderChange = useCallback((order: Order) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page-options[order]', order);
    newParams.set('page-options[page]', '1');
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  return {
    currentPage,
    currentOrderBy,
    currentOrder,
    handlePageChange,
    handleSortFieldChange,
    handleSortOrderChange,
    getPaginationParams,
  };
};