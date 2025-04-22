import * as React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const guestRoutes = {
  home: { route: '/', path: '/' },
  navBar: {
    favorites: {
      icon: <FavoriteBorderIcon />,
      text: 'Favorites',
      path: '/favorites',
      route: '/favorites',
    },
  },
  products: {
    route: '/products',
    path: '/products',
    search:'/products/search?',
    productRoute : '/products/:id',
  },
  error: {
    route: 'error',
    path: 'error',
  },
};