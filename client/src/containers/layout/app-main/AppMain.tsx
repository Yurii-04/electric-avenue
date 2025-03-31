import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useGetMeQuery } from '~/redux/api/userApi';
import Loader from '~/components/loader/Loader';
import { Suspense } from 'react';
import { styles } from '~/containers/layout/app-main/styles';
import AppBreadCrumbs from '~/containers/layout/app-breadcrumbs/AppBreadCrumbs';

const AppMain = () => {
  const { isLoading } = useGetMeQuery(null);

  return (
    <Box sx={styles.content} component="main">
      {isLoading ? (
        <Loader pageLoad />
      ) : (
        <Suspense fallback={<Loader pageLoad />}>
          <AppBreadCrumbs />
          <Outlet />
        </Suspense>
      )}
    </Box>
  );
};

export default AppMain;
