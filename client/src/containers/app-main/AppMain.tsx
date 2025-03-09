import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useGetMeQuery } from '~/redux/api/userApi';

const AppMain = () => {
  useGetMeQuery(null);

  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default AppMain;
