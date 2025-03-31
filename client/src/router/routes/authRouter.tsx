import { Route } from 'react-router-dom';
import { authRoutes } from '~/router/constants/authRoutes';
import AddProduct from '~/pages/add-product/addProduct';
import MyAccount from '~/pages/my-account/MyAccount';
import AuthRoute from '~/router/helpers/AuthRoute';
import { addProduct, myAccount } from '~/router/constants/crumbs';

export const authRouter = (
  <Route
    element={<AuthRoute />}
  >
    <Route path={authRoutes.navBar.myAccount.route} element={<MyAccount />} handle={{crumb: myAccount}} />
    <Route path={authRoutes.navBar.addProduct.route} element={<AddProduct />} handle={{crumb: addProduct}} />
  </Route>
);