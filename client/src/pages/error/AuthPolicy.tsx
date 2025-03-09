import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription';
import { guestRoutes } from '~/router/constants/guestRoutes';
import { styles } from '~/pages/error/styles/AuthPolicy.styles';
import error401 from '~/assets/img/error-page/401.svg';

const AuthPolicy = () => {
  return (
    <Container sx={styles.container}>
      <Box sx={styles.errorInfo}>
        <TitleWithDescription
          title="Authorization error"
          description="Incorrect authorization or authentication of the user on the server side, or when accessing a specific URL. We suggest you go to the home page."
          style={styles.titleWithDescription}
        />
        <Button
          component={Link}
          size="large"
          to={guestRoutes.home.path}
          variant="contained"
        >
          Home
        </Button>
      </Box>
      <Box
        alt="Authorization error"
        component="img"
        src={error401}
        sx={styles.errorImage}
      />
    </Container>
  );
};

export default AuthPolicy;