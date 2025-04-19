import React, { useCallback, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { ErrorResponse, SearchParams, SearchResult, snackbarVariants } from '~/types';
import { useDebounce } from '~/hooks/use-debounce';
import { useAxios } from '~/hooks/use-axios';
import { productService } from '~/services/product-service';
import { useSnackbarContext } from '~/context/snackbar';
import { defaultResponse } from '~/constants/response';
import SearchIcon from '@mui/icons-material/Search';
import { styles } from '~/containers/search-bar/search-bar.styles';
import { useToggleVisibility } from '~/hooks/use-toggle-visibility';
import Box from '@mui/material/Box';
import { SearchResultsList } from '~/components/search-bar-result-list/SearchResultsList';

const SearchBar = () => {
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, setIsOpen, containerRef } = useToggleVisibility<HTMLDivElement>();
  const { setAlert } = useSnackbarContext();
  const shouldShowList = isOpen && input.length > 0;
  const serviceFunction = useCallback(
    (params?: SearchParams) => productService.searchProductsTitles(params),
    [],
  );

  const onResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.Error,
      message: `${error.statusCode} - ${error.error}`,
    });
  };

  const { response: data, fetchData } = useAxios<SearchResult, SearchParams>({
    service: serviceFunction,
    defaultResponse: defaultResponse,
    onResponse: () => {
      setIsLoading(false);
    },
    onResponseError,
    fetchOnMount: false,
  });

  const debouncedFetchData = useDebounce<SearchParams>(fetchData, 200);

  const handleChange = (value: string) => {
    setInput(value);
    if (value.trim() === '') {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    debouncedFetchData({ query: value });
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
      {shouldShowList && (
        <SearchResultsList
          data={data}
          isLoading={isLoading}
          setIsOpen={setIsOpen}
        />
      )}
    </Box>
  );
};

export default SearchBar;
