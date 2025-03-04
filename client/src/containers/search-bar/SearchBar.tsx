import React, { useCallback, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { ErrorResponse, Product, ProductWithPagination, SearchParams, snackbarVariants } from '~/types';
import { useDebounce } from '~/hooks/use-debounce';
import { useAxios } from '~/hooks/use-axios';
import { productService } from '~/services/product-service';
import { useSnackbarContext } from '~/context/snackbar';
import { defaultResponse } from '~/constants/response';
import SearchIcon from '@mui/icons-material/Search';
import { styles } from '~/containers/search-bar/search-bar.styles';
import { useToggleVisibility  } from '~/hooks/use-toggle-visibility';
import Box from '@mui/material/Box';
import { SearchResultsList } from '~/components/search-bar-result-list/SearchResultsList';

const SearchBar = () => {
  const [input, setInput] = useState<string>('');
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, setIsOpen, containerRef } = useToggleVisibility <HTMLDivElement>();
  const { setAlert } = useSnackbarContext();
  const shouldShowList = isOpen && input.length > 0;
  const serviceFunction = useCallback(
    (params?: SearchParams) => productService.searchProducts(params),
    [],
  );

  const onResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.Error,
      message: `${error.statusCode} - ${error.error}`,
    });
  };

  const { fetchData } = useAxios<ProductWithPagination, SearchParams>({
    service: serviceFunction,
    defaultResponse,
    onResponse: (response) => {
      setData(response.data)
      setIsLoading(false);
    },
    onResponseError,
    fetchOnMount: false,
  });

  const debouncedFetchData = useDebounce<SearchParams>(fetchData, 200);

  const handleChange = (value: string) => {
    setInput(value);
    if (value.trim() === '') {
      setData([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    debouncedFetchData({ title: value });
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => e.preventDefault()}
      ref={containerRef}
    >
      <TextField
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        sx={styles.searchBar}
        fullWidth
        placeholder="I'm looking..."
        type="search"
        autoComplete="off"
        aria-label="Search products"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      {shouldShowList && <SearchResultsList data={data} isLoading={isLoading} />}
    </Box>
  );
};

export default SearchBar;
