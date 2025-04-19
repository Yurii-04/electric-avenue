import { Route } from 'react-router-dom';
import { guestRoutes } from '~/router/constants/guestRoutes';
import { lazy } from 'react';
import { cart, favorites, products, product } from '~/router/constants/crumbs';

const Favorites = lazy(() => import('~/pages/favorites/Favorites'));
const Cart = lazy(() => import('~/pages/cart/Cart'));
const Products = lazy(() => import('~/pages/products/Products'));
const Product = lazy(() => import('~/pages/product/Product'));

export const guestRouter = (
  <Route>
    <Route path={guestRoutes.navBar.favorites.route} element={<Favorites />} handle={{ crumb: favorites }} />
    <Route path={guestRoutes.navBar.cart.route} element={<Cart />} handle={{ crumb: cart }} />
    <Route path={guestRoutes.products.search} element={<Products />} handle={{ crumb: products }} />
    <Route path={guestRoutes.products.productRoute} element={<Product />} handle={{ crumb: product }} />
  </Route>
);