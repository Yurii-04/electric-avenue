import { ProductMainFields } from '~/types';
import React, { FC } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styles } from '~/components/product-card/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import { URLs } from '~/constants/request';

type ProductCardProps = {
  product: ProductMainFields;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCartClick = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
  };

  return (
    <Box
      sx={styles.card}
      onClick={() => navigate(`${URLs.product.get}/${product.id}`)}
      role="link"
      tabIndex={0}
    >
      <Box
        sx={styles.image}
        src={product.productImages[0].url}
        component="img"
      />
      <Box sx={styles.descriptionWrapper}>
        <Typography sx={styles.title} variant="body2">{product.title}</Typography>
        <Box>
          <Typography variant="h5">{product.price}$</Typography>
          <Box sx={styles.iconWrapper} component="button">
            <ShoppingCartOutlinedIcon
              sx={{ fill: 'white' }}
              onClick={(e) => handleCartClick(e)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;