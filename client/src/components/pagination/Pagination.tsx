import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Stack } from '@mui/material';
import React, { FC } from 'react';
import { Order, PaginationMeta } from '~/types';
import { styles } from '~/components/pagination/styles';

type PaginationProps = {
  meta: PaginationMeta | null;
  sortOptions?: { value: string, label: string }[];
  currentPage: number,
  currentOrderBy: string,
  currentOrder: Order,
  handlePageChange: (page: number) => void,
  handleSortFieldChange: (sortField: string) => void,
  handleSortOrderChange: (sortOrder: Order) => void,
}

const PaginationComponent: FC<PaginationProps> = (
  {
    meta,
    sortOptions = [],
    currentPage,
    currentOrderBy,
    currentOrder,
    handlePageChange,
    handleSortFieldChange,
    handleSortOrderChange,
  },
) => {

  if (!meta) return null;

  const onPageChange  = (_event: React.ChangeEvent<unknown>, value: number) => {
    handlePageChange(value);
  };

  const onSortFieldChange  = (event: SelectChangeEvent) => {
    const newOrderBy = event.target.value;
    handleSortFieldChange(newOrderBy);
  };

  const onSortOrderChange  = (event: SelectChangeEvent<Order>) => {
    const newOrder = event.target.value as Order;
    handleSortOrderChange(newOrder);
  };

  return (
    <Stack spacing={2} direction="row" sx={styles.stack}>
      <Pagination
        count={meta.pageCount}
        page={currentPage}
        onChange={onPageChange}
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
              onChange={onSortFieldChange}
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
              onChange={onSortOrderChange}
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

export default PaginationComponent;