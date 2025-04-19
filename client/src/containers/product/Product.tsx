import { FC, useCallback } from 'react';
import { useAxios } from '~/hooks/use-axios';
import { productService } from '~/services/product-service';
import { Product as IProduct } from '~/types';
import { defaultProductResponse } from '~/constants/response';
import ProductImages from '~/components/product-images/ProductImages';
import { Box } from '@mui/material';
import { styles } from '~/containers/product/styles';
import ProductDetails from '~/components/product-details/ProductDetails';
import UserCard from '~/components/user-card/UserCard';
import Loader from '~/components/loader/Loader';
import ProductAttribute from '~/components/product-attribute/ProductAttribute';

type ProductProps = {
  id: string;
}

const Product: FC<ProductProps> = ({ id }) => {
  const { response, loading } = useAxios<IProduct, { id: string }>({
    service: useCallback(
      () => productService.getById(id),
      [id],
    ),
    defaultResponse: defaultProductResponse,
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.leftSection}>
        <ProductImages images={response.productImages} />
      </Box>
      <Box sx={styles.rightSection}>
        <UserCard
          createdAt={response.seller.createdAt}
          lastName={response.seller.lastName}
          firstName={response.seller.firstName}
        />
        <ProductDetails
          createdAt={response.createdAt}
          price={response.price}
          title={response.title}
          description={response.description}
        />
        <ProductAttribute productAttributes={response.productAttributes} />
      </Box>
    </Box>
  );
};

export default Product;