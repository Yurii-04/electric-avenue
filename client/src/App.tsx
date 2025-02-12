import { ThemeProvider } from '@mui/material';
import { theme } from './styles/app-theme';
import Header from './containers/layout/header/Header';
import SearchBar from '~/containers/search-bar/SearchBar';
import { useState } from 'react';
import { SearchResultsList } from '~/containers/search-bar/SearchBarResultList';
import { Product } from '~/types/products/interfaces/products.interfaces';
import { SnackbarProvider } from '~/context/snackbar';

export default function App() {
  const [data, setData] = useState<Product[]>([]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Header />
        <SearchBar setData={setData} />
        {data && data.length > 0 && <SearchResultsList data={data} />}
      </SnackbarProvider>
    </ThemeProvider>
  );
}
