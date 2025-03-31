import Box from '@mui/material/Box';
import Header from '~/containers/layout/header/Header';
import AppMain from '~/containers/layout/app-main/AppMain';
import { styles } from '~/containers/app-content/styles';
import Footer from '~/containers/layout/footer/Footer';

const AppContent = () => {
  return (
    <Box sx={styles.root}>
      <Header />
      <AppMain />
      <Footer />
    </Box>
  );
};

export default AppContent;