import { ProductMainFields } from '~/types';
import { FC } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styles } from '~/components/product-card/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
  product: ProductMainFields;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={styles.card}
      onClick={() => navigate(`/products/${product.id}`)}
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
          <Box sx={styles.iconWrapper} component='button'>
            <ShoppingCartOutlinedIcon sx={{ fill: 'white' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;