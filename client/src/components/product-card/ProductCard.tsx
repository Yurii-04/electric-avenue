import { ProductMainFields } from '~/types';
import React, { FC } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styles } from '~/components/product-card/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import { URLs } from '~/constants/request';

type ProductCardProps = {
  product: ProductMainFields;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={styles.card} component={Link} to={`${URLs.product.get}/${product.id}`}>
      <Box
        sx={styles.image}
        src={product.productImages[0].url}
        component="img"
      />
      <Box sx={styles.descriptionWrapper}>
        <Typography sx={styles.title} variant="body2">{product.title}</Typography>
        <Typography variant="h5" className="price">{product.price}$</Typography>
      </Box>
      <Box sx={styles.iconWrapper} component="button" onClick={handleCartClick}>
        <FavoriteBorderIcon
          sx={{ fill: 'white' }}
        />
      </Box>
    </Box>
  );
};

export default ProductCard;