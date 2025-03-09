import { Route } from 'react-router-dom';
import { errorRoutes } from '~/router/constants/errorRoutes';
import { lazy } from 'react';

const NotFound = lazy(() => import('~/pages/error/NotFound'))
const AuthPolicy = lazy(() => import('~/pages/error/AuthPolicy'))

const ErrorRouter = (
  <>
    <Route element={<NotFound />} path={errorRoutes.notFound.route} />
    <Route element={<AuthPolicy />} path={errorRoutes.authPolicy.route} />
  </>
)

export default ErrorRouter;