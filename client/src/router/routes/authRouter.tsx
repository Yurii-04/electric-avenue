import { Route } from 'react-router-dom';
import { authRoutes } from '~/router/constants/authRoutes';
import AddProduct from '~/pages/add-product/addProduct';
import MyAccount from '~/pages/my-account/MyAccount';

export const authRouter = (
  <Route>
    <Route path={authRoutes.navBar.myAccount.route} element={<MyAccount />} />
    <Route path={authRoutes.navBar.addProduct.route} element={<AddProduct />} />
  </Route>
);