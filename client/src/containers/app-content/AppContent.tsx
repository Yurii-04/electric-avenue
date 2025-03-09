import Box from '@mui/material/Box';
import Header from '~/containers/layout/header/Header';
import AppMain from '~/containers/app-main/AppMain';

const AppContent = () => {
  return (
    <Box>
      <Header />
      <AppMain />
    </Box>
  );
};

export default AppContent;