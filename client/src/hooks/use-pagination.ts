import { ApiResponse, Order, PaginationMeta } from '~/types';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

interface UsePaginationProps {
  defaultTake: number;
  defaultOrderBy: string;
  defaultOrder: Order;
}

export const usePagination = <T> (
  {
    defaultTake = 10,
    defaultOrderBy = 'createdAt',
    defaultOrder = Order.DESC
  }: UsePaginationProps
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getPageOptions = () => {
    const page = Number(searchParams.get('page-options[page]')) || 1;
    const orderBy = searchParams.get('page-options[orderBy]') || defaultOrderBy;
    const order = (searchParams.get('page-options[order]') as Order) || defaultOrder;

    return {
      page,
      take: defaultTake,
      orderBy,
      order
    };
  };

  const fetchData = async (fetcher: (options: ReturnType<typeof getPageOptions>) => Promise<ApiResponse<T>>) => {
    setLoading(true);
    setError(null);

    try {
      const options = getPageOptions();
      const response = await fetcher(options);

      setData(response.data);
      setMeta(response.meta);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Помилка завантаження даних');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page-options[page]', page.toString());
    setSearchParams(newParams);
  };

  const changeSort = (orderBy: string, order: Order) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page-options[orderBy]', orderBy);
    newParams.set('page-options[order]', order);
    newParams.set('page-options[page]', '1');
    setSearchParams(newParams);
  };

  return {
    data,
    meta,
    loading,
    error,
    fetchData,
    changePage,
    changeSort,
    pageOptions: getPageOptions()
  };
}