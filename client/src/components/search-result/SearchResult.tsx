import React from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

type SearchResultProps = {
  title: string
  onClick: () => void
}

const SearchResult = ({ title, onClick }: SearchResultProps) =>
  <ListItem disablePadding>
    <ListItemButton onClick={onClick}>
      <ListItemText>{title}</ListItemText>
    </ListItemButton>
  </ListItem>;

export default SearchResult;