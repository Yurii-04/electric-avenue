import Box from '@mui/material/Box';
import Header from '~/containers/layout/header/Header';
import { Outlet } from 'react-router-dom';

const AppContent = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

export default AppContent;