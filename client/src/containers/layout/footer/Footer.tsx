import { Box } from '@mui/material';
import { styles } from '~/containers/layout/footer/styles';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box sx={styles.root} component='footer'>
      <Typography>© 2025 All rights reserved</Typography>
    </Box>
  );
};

export default Footer;