import { Route } from 'react-router-dom';
import { guestRoutes } from '~/router/constants/guestRoutes';
import { lazy } from 'react';
import { cart, favorites, products } from '~/router/constants/crumbs';

const Favorites = lazy(() => import('~/pages/favorites/Favorites'));
const Cart = lazy(() => import('~/pages/cart/Cart'));
const Products = lazy(() => import('~/pages/products/Products'));

export const guestRouter = (
<Route>
  <Route path={guestRoutes.navBar.favorites.route} element={<Favorites />} handle={{crumb: favorites}} />
  <Route path={guestRoutes.navBar.cart.route} element={<Cart />} handle={{crumb: cart}} />
  <Route path={guestRoutes.products.searchByCategory(':categoryId')} element={<Products />} handle={{crumb: products}} />
</Route>
);