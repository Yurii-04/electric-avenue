import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ProductCard from '~/components/product-card/ProductCard';
import { useAxios } from '~/hooks/use-axios';
import { productService } from '~/services/product-service';
import { defaultResponse } from '~/constants/response';
import { ErrorResponse, FindProductsParams, ProductWithPagination, snackbarVariants } from '~/types';
import { useSnackbarContext } from '~/context/snackbar';
import { styles } from '~/containers/products/styles';
import ProductAttributes from '~/containers/product-attributes/ProductAttributes';
import Loader from '~/components/loader/Loader';

const Products = () => {
  const { setAlert } = useSnackbarContext();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const title = searchParams.get('title');
  const [products, setProducts] = useState<ProductWithPagination>(defaultResponse);
  const onResponseError = useCallback((error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.Error,
      message: `${error.statusCode} - ${error.error}`,
    });
  }, [setAlert]);

  const getSearchParams = useCallback((): FindProductsParams => ({
    ...(category && { category }),
    ...(title && { title })
  }), [category, title]);

  const { loading, fetchData } = useAxios<ProductWithPagination, FindProductsParams>({
    service: useCallback(
      () => productService.findProducts(getSearchParams()),
      [getSearchParams]
    ),
    defaultResponse: defaultResponse,
    onResponseError,
    onResponse: useCallback((responseData: ProductWithPagination) => {
      setProducts(responseData);
    }, [setProducts]),
  });

  const categoryIds = Array.from(new Set(products.data.map(product => product.categoryId)));
  if (loading) return <Loader />;

  return (
    <Box sx={styles.container}>
      <ProductAttributes
        fetchProducts={fetchData}
        categoryIds={categoryIds}
        setProducts={setProducts}
      />
      <Box sx={styles.wrapper} className="wrapper">
        {products.data.length > 0 ? (
          products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <Typography
            sx={styles.notFoundTitle}
            variant="h4"
          >
            No products were found using these criteria.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Products;