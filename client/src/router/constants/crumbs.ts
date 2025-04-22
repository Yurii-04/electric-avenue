import { guestRoutes } from '~/router/constants/guestRoutes';
import { authRoutes } from '~/router/constants/authRoutes';

export const home = {
  name: 'Home page',
  path: guestRoutes.home.route,
}

export const favorites = {
  name: 'Favorites page',
  path: guestRoutes.navBar.favorites.route
}

export const products = {
  name: 'Products page',
  path: guestRoutes.products.route
}
export const product = {
  name: 'Product page',
  path: guestRoutes.products.productRoute
}

export const myAccount = {
  name: 'My Account page',
  path: authRoutes.navBar.myAccount.route
}

export const addProduct = {
  name: 'Add Product Page',
  path: authRoutes.navBar.addProduct.route
}