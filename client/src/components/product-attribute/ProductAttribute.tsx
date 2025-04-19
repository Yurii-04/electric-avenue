import { FC } from 'react';
import { Product } from '~/types';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styles } from '~/components/product-attribute/styles';

type ProductAttributeProps = Pick<Product, 'productAttributes'>

const ProductAttribute: FC<ProductAttributeProps> = ({ productAttributes }) => {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant='h5'>Product characteristics</Typography>
      {productAttributes.map((item, index) => (
        <Box key={index} sx={styles.item}>
          <Typography variant="subtitle2">{item.key}</Typography>
          <Typography>{item.value}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProductAttribute;