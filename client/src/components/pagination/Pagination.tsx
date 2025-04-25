/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Stack } from '@mui/material';
import React, { FC } from 'react';
import { Order, PaginationMeta } from '~/types';
import { useSearchParams } from 'react-router-dom';
import { styles } from '~/components/pagination/styles';

type PaginationProps = {
  meta: PaginationMeta | null;
  onPageChange: (page: number) => void;
  sortOptions?: { value: string, label: string }[];
  onSortChange?: (orderBy: string, order: Order) => void;
}

const PaginationComponent: FC<PaginationProps> = (
  {
    meta,
    onPageChange,
    sortOptions = [],
    onSortChange,
  },
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentOrderBy = searchParams.get('page-options[orderBy]') || (sortOptions.length > 0 ? sortOptions[0].value : '');
  const currentOrder = (searchParams.get('page-options[order]') as Order) || Order.DESC;

  if (!meta) return null;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page-options[page]', value.toString());
    setSearchParams(newParams);

    onPageChange(value);
  };

  const handleSortFieldChange = (event: SelectChangeEvent) => {
    const newOrderBy = event.target.value;

    const newParams = new URLSearchParams(searchParams);
    newParams.set('page-options[orderBy]', newOrderBy);
    newParams.set('page-options[page]', '1');
    setSearchParams(newParams);

    if (onSortChange) {
      onSortChange(newOrderBy, currentOrder);
    }
  };

  const handleSortOrderChange = (event: SelectChangeEvent<Order>) => {
    const newOrder = event.target.value as Order;

    const newParams = new URLSearchParams(searchParams);
    newParams.set('page-options[order]', newOrder);
    newParams.set('page-options[page]', '1');
    setSearchParams(newParams);

    if (onSortChange) {
      onSortChange(currentOrderBy, newOrder);
    }
  };

  return (
    <Stack spacing={2} direction="row" sx={styles.stack}>
      <Pagination
        count={meta.pageCount}
        page={meta.page}
        onChange={handlePageChange}
        color="primary"
        siblingCount={1}
      />
      {sortOptions.length > 0 && (
        <>
          <FormControl size="small" sx={styles.sortOptionsForm}>
            <InputLabel id="sort-field-select-label">Sorting</InputLabel>
            <Select
              labelId="sort-field-select-label"
              id="sort-field-select"
              value={currentOrderBy}
              label="Sorting"
              onChange={handleSortFieldChange}
            >
              {sortOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={styles.orderByForm}>
            <InputLabel id="sort-order-select-label">Direction</InputLabel>
            <Select
              labelId="sort-order-select-label"
              id="sort-order-select"
              value={currentOrder}
              label="Direction"
              onChange={handleSortOrderChange}
            >
              <MenuItem value={Order.ASC}>In ascending order</MenuItem>
              <MenuItem value={Order.DESC}>In descending order</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
    </Stack>
  );
};

export default Pagination;