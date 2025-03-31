import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { useAppSelector } from '~/redux/store';
import { errorRoutes } from '~/router/constants/errorRoutes';
import { selectIsAuthenticated } from '~/redux/features/userSlice';

const AuthRoute = () => {
  const context = useOutletContext();
  const isAuth = useAppSelector(selectIsAuthenticated);

  if (!isAuth) {
    return <Navigate to={errorRoutes.authPolicy.path} />;
  }

  return <Outlet context={context} />
};

export default AuthRoute;