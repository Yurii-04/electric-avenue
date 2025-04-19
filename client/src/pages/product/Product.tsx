import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '~/components/container/Container';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { errorRoutes } from '~/router/constants/errorRoutes';
import ProductContainer from '~/containers/product/Product';
import { useEffect } from 'react';

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate(errorRoutes.notFound.route);
    }
  }, [id, navigate]);

  return (
    <Container>
      <Button
        size="small"
        startIcon={<ArrowBackIosNewRoundedIcon />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      {id && <ProductContainer id={id} />}
    </Container>
  );
};

export default Product;