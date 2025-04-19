import { Box, Button } from '@mui/material';
import { Product } from '~/types';
import { FC } from 'react';
import Typography from '@mui/material/Typography';
import { styles } from './styles';

type ProductDetailsProps = Pick<Product, 'title' | 'description' | 'price' | 'createdAt'>

const ProductDetails: FC<ProductDetailsProps> = ({ title, description, price, createdAt }) => {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h4" sx={styles.title}>{title}</Typography>
      <Typography color="basic.turquoiseDark" variant="caption">Published
        on {new Date(createdAt).toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}</Typography>
      <Typography variant="h4" sx={styles.price}>{price} $</Typography>
      <Typography variant="body1">{description} $</Typography>
      <Button fullWidth variant="contained" size="large">Message</Button>
    </Box>
  );
};

export default ProductDetails;