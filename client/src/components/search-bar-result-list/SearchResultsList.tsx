import React, { FC } from 'react';
import { List, ListItem, ListItemText, Skeleton } from '@mui/material';
import SearchResult from '~/components/search-result/SearchResult';
import { styles } from './styles';
import { useNavigate } from 'react-router-dom';
import { URLs } from '~/constants/request';
import { SearchResult as SearchResultType } from '~/types';

type SearchResultsListProps = {
  data: SearchResultType;
  isLoading: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SearchResultsList: FC<SearchResultsListProps> = ({ data, isLoading, setIsOpen }) => {
  const { data: titles } = data;
  const navigate = useNavigate();
  const handleClick = (title: string) => {
    setIsOpen(false);
    navigate(URLs.product.search.byTitle + title);
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
      {titles.length === 0 ? (
          <ListItem>
            <ListItemText secondary='No results found' />
          </ListItem>
        ) :
        titles.map((data) => (
          <SearchResult
            key={data.title}
            title={data.title}
            onClick={() => handleClick(data.title)}
          />
        ))
      }
    </List>
  );
};
