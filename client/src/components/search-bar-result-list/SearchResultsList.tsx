import React from 'react';
import { List, ListItem, ListItemText, Skeleton } from '@mui/material';
import SearchResult from '~/components/search-result/SearchResult';
import { Product } from '~/types/products/interfaces/products.interfaces';
import { styles } from './styles';

type SearchResultsListProps = {
  data: Product[];
  isLoading: boolean;
}

export const SearchResultsList = ({ data, isLoading }: SearchResultsListProps) => {
  const handleClick = (title: string) => {
    alert(`You selected ${title}`);
  };

  if (isLoading) {
    return (
      <List sx={styles.resultsList}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={24} sx={{ mb: 1 }} />
        ))}
      </List>
    );
  }

  return (
    <List sx={styles.resultsList}>
      {data.length === 0 ? (
          <ListItem>
            <ListItemText>No results found</ListItemText>
          </ListItem>
        ) :
        data.map((data) => (
          <SearchResult
            key={data.id}
            title={data.title}
            onClick={() => handleClick(data.title)}
          />
        ))
      }
    </List>
  );
};
