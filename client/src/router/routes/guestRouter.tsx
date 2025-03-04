import { Route } from 'react-router-dom';
import { guestRoutes } from '~/router/constants/guestRoutes';
import Favorites from '~/pages/favorites/Favorites';
import Cart from '~/pages/cart/Cart';
import Products from '~/pages/products/Products';

export const guestRouter = (
  <Route>
    <Route path={guestRoutes.navBar.favorites.route} element={<Favorites />} />
    <Route path={guestRoutes.navBar.cart.route} element={<Cart />} />
    <Route path={guestRoutes.products.searchByCategory(':categoryId')} element={<Products />} />
  </Route>
);