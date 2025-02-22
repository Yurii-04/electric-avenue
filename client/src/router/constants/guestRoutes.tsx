import * as React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export const guestRoutes = {
  navBar: {
    favorites: {
      icon: <FavoriteBorderIcon />,
      text: 'Favorites',
      path: '/favorites',
    },
    cart: {
      icon: <ShoppingCartOutlinedIcon />,
      text: 'Cart',
      path: '/cart',
    },
  },
};