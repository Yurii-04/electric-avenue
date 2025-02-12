import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Input, Box } from '@mui/material';
import { ErrorResponse, Product, ProductWithPagination, SearchParams, snackbarVariants } from '~/types';
import { useDebounce } from '~/hooks/use-debounce';
import { useAxios } from '~/hooks/use-axios';
import { productService } from '~/services/product-service';
import { useSnackbarContext } from '~/context/snackbar';
import { defaultResponse } from '~/constants/response';

type SearchBarProps = {
  setData: Dispatch<SetStateAction<Product[]>>;
}

const SearchBar = ({ setData }: SearchBarProps) => {
  const [input, setInput] = useState<string>('');
  const {setAlert} = useSnackbarContext();

  const serviceFunction = useCallback(
    (params?: SearchParams) => productService.searchProducts(params),
    [],
  );

  const onResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.Error,
      message: `${error.statusCode} - ${error.error}`,
    })
  }

  const { fetchData } = useAxios<ProductWithPagination, SearchParams>({
    service: serviceFunction,
    defaultResponse,
    onResponse: (response) => setData(response.data),
    onResponseError,
    fetchOnMount: false,
  });

  const debouncedFetchData = useDebounce<SearchParams>(fetchData);

  const handleChange = (value: string) => {
    setInput(value);
    if(value.trim() === '') {
      setData([]);
      return;
    }
    debouncedFetchData({ title: value });
  };

  return (
    <Box>
      <Input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
