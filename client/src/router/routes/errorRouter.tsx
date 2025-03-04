import { Route } from 'react-router-dom';
import { errorRoutes } from '~/router/constants/errorRoutes';
import { lazy } from 'react';

const NotFound = lazy(() => import('~/pages/error/NotFound'))

const ErrorRouter = (
  <>
    <Route element={<NotFound />} path={errorRoutes.notFound.route} />
  </>
)

export default ErrorRouter;