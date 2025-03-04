import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import App from '~/App';
import { errorRoutes } from '~/router/constants/errorRoutes';
import { guestRoutes } from '~/router/constants/guestRoutes';
import { guestRouter } from '~/router/routes/guestRouter';
import { authRouter } from '~/router/routes/authRouter';
import errorRouter from '~/router/routes/errorRouter';
import AppContent from '~/containers/app-content/AppContent';
import Home from '~/pages/home/Home';

export const routerConfig = (
  <Route
    element={<App />}
    errorElement={<Navigate to={errorRoutes.notFound.path} />}
    path={guestRoutes.home.route}
  >
    <Route element={<AppContent />}>
      <Route element={<Home />} index />
      {guestRouter}
      {authRouter}
      <Route path={guestRoutes.error.route}>{errorRouter}</Route>
    </Route>
  </Route>
);

export const router = createBrowserRouter(
  createRoutesFromElements(routerConfig),
);



