import * as React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export const guestRoutes = {
  home: { route: '/', path: '/' },
  navBar: {
    favorites: {
      icon: <FavoriteBorderIcon />,
      text: 'Favorites',
      path: '/favorites',
      route: '/favorites',
    },
    cart: {
      icon: <ShoppingCartOutlinedIcon />,
      text: 'Cart',
      path: '/cart',
      route: '/cart',
    },
  },
  products: {
    route: '/products',
    path: '/products',
    searchByCategory: (categoryId: number | string) => `/products/search-by-category/${categoryId}`,
  },
  error: {
    route: 'error',
    path: 'error',
  }
};