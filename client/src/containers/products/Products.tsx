import { useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import ProductCard from '~/components/product-card/ProductCard';
import { useAxios } from '~/hooks/use-axios';
import { productService } from '~/services/product-service';
import { defaultResponse } from '~/constants/response';
import {
  ErrorResponse,
  FindProductsParams, Order,
  ProductWithPagination,
  snackbarVariants,
} from '~/types';
import { useSnackbarContext } from '~/context/snackbar';
import { styles } from '~/containers/products/styles';
import ProductAttributes from '~/containers/product-attributes/ProductAttributes';
import Loader from '~/components/loader/Loader';
import { useFindProductsParams } from '~/hooks/use-find-product-params';
import CategoriesSwiper from '~/components/categories-swiper/CategoriesSwiper';
import { usePagination } from '~/hooks/use-pagination';
import PaginationComponent from '~/components/pagination/Pagination';

const Products = () => {
  const { setAlert } = useSnackbarContext();
  const filterParams = useFindProductsParams();
  const {
    getPaginationParams,
    currentPage,
    currentOrderBy,
    currentOrder,
    handlePageChange,
    handleSortFieldChange,
    handleSortOrderChange,
  } = usePagination({
    defaultPage: 1,
    defaultOrder: Order.DESC,
    defaultOrderBy: 'createdAt',
    take: 20,
  });

  const params = useMemo<FindProductsParams>(() => ({
    ...filterParams,
    'page-options': getPaginationParams(),
  }), [filterParams, getPaginationParams]);


  const onResponseError = useCallback((error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.Error,
      message: `${error.statusCode} - ${error.message}`,
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
      {!filterParams.category && <CategoriesSwiper />}
      <Box sx={styles.container}>
        {filterParams.category && <ProductAttributes categoryId={[filterParams.category]} />}
        <Box width="100%">
          <Box sx={styles.productsWrapper}>
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
          <Box sx={styles.paginationWrapper}>
            {response.meta.pageCount > 1 && (
              <PaginationComponent
                meta={response.meta}
                currentPage={currentPage}
                currentOrderBy={currentOrderBy}
                currentOrder={currentOrder}
                handlePageChange={handlePageChange}
                handleSortFieldChange={handleSortFieldChange}
                handleSortOrderChange={handleSortOrderChange}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
