import { Box, Button } from '@mui/material';
import { styles } from '~/pages/error/styles/NotFound.styles';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { guestRoutes } from '~/router/constants/guestRoutes';
import manImg from '~/assets/img/error-page/404-man.svg';

const NotFound = () => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.box}>
        <Box sx={styles.textWrapper}>
          <Typography variant="h4">Page Not Found</Typography>
          <Typography variant="subtitle2">
            We are sorry, but the page you were trying to find does not exist. We suggest you go to the home
            page.
          </Typography>
        </Box>
        <Button
          size="large"
          sx={styles.homePageLink}
          variant="contained"
          component={Link} to={guestRoutes.home.path}
        >
          Home Page
        </Button>
      </Box>
      <Box
        component="img"
        alt="man with bag"
        src={manImg}
        sx={styles.manImg}
      />
    </Box>
  );
};

export default NotFound;