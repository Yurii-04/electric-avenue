import * as React from 'react';
import { cloneElement, FC, JSX } from 'react';
import { Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { alignItemsCenter } from '~/styles/common-styles/common-styles';
import { authRoutes } from '~/router/constants/authRoutes';
import { guestRoutes } from '~/router/constants/guestRoutes';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { styles } from '~/containers/layout/sidebar/styles';
import ImgIcon from '~/components/img-icon/ImgIcon';
import { Link } from 'react-router-dom';
import LoginButton from '~/components/login-button/LoginButton';

type SidebarProps = {
  open: boolean
  toggleDrawer: (newOpen: boolean) => void
  isAuth: boolean
  handleCatalogBtnClick: () => void
}

type NavItem = {
  icon: JSX.Element
  text: string
  route: string
}

const Sidebar: FC<SidebarProps> = ({ open, toggleDrawer, isAuth, handleCatalogBtnClick }) => {
  const renderNavList = (arr: NavItem[]) => (
    <List>
      {arr.map(({ icon, text, route }, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            sx={alignItemsCenter}
            onClick={() => toggleDrawer(false)}
            component={Link}
            to={route}
          >
            {cloneElement(icon, { sx: { paddingRight: '10px' } })}
            <ListItemText>{text}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Drawer open={open} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 250 }}>
        <IconButton onClick={() => toggleDrawer(false)} sx={styles.iconBtn}>
          <CloseRoundedIcon />
        </IconButton>
        <Box>
          <List>
            <ListItem sx={styles.logoLi}>
              <ImgIcon sx={styles.logo} />
            </ListItem>
            <ListItem>
              <Button
                startIcon={<GridViewOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={() => {
                  toggleDrawer(false);
                  handleCatalogBtnClick();
                }}
              >
                Catalog
              </Button>
            </ListItem>
            {isAuth ??
              <ListItem>
                <LoginButton
                  onClick={() => toggleDrawer(false)}
                  fullWidth={true}
                  sx={styles.loginBtn}
                  startIcon={true}
                />
              </ListItem>
            }
          </List>
          <Divider />
        </Box>
        <Box sx={styles.secondSection}>
          {renderNavList(Object.values(isAuth ? authRoutes.navBar : guestRoutes.navBar))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;