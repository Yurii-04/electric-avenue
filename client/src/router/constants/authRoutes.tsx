import * as React from 'react';
import ProfileIcon from '~/assets/img/common/profile.svg?react';
import CustomIcon from '~/components/custom-icon/CustomIcon';
import { guestRoutes } from '~/router/constants/guestRoutes';
import AddIcon from '@mui/icons-material/Add';

export const authRoutes = {
  navBar: {
    myAccount: {
      icon: <CustomIcon icon={ProfileIcon} fontSize="small" />,
      text: 'My account',
      path: '/my-account',
      route: '/my-account',
    },
    addProduct: {
      icon: <AddIcon />,
      text: 'Add a product',
      path: '/add-product',
      route: '/add-product',
    },
    ...guestRoutes.navBar,
  },
};
