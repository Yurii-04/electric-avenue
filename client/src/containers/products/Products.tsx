import { useCallback } from 'react';
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
import { useFindProductsParams } from '~/hooks/use-find-product-params';
import CategoriesSwiper from '~/components/categories-swiper/CategoriesSwiper';

const Products = () => {
  const { setAlert } = useSnackbarContext();
  const params = useFindProductsParams();
  const { category } = params;
  const onResponseError = useCallback((error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.Error,
      message: `${error.statusCode} - ${error.error}`,
    });
  }, [setAlert]);

  const { loading, response } = useAxios<ProductWithPagination, FindProductsParams>({
    service: useCallback(
      () => productService.findProducts(params),
      [params],
    ),
    defaultResponse,
    onResponseError,
  });

  if (loading) return <Loader />;

  return (
    <Box sx={styles.wrapper}>
      {!category && (<CategoriesSwiper />)}
      <Box sx={styles.container}>
        {category && <ProductAttributes categoryId={[category]} />}
        <Box sx={styles.productsWrapper} className="wrapper">
          {response.data.length > 0 ? (
            response.data.map((product) => (
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
    </Box>
  );
};

export default Products;