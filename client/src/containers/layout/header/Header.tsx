import * as React from 'react';
import { useState } from 'react';
import { styles } from './header.styles';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Container from '~/components/container/Container';
import ImgIcon from '~/components/img-icon/ImgIcon';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from '~/containers/search-bar/SearchBar';
import { CustomMenu } from '~/styles/app-theme/styled-components/custom-menu';
import { authRoutes } from '~/router/constants/authRoutes';
import Sidebar from '~/containers/layout/sidebar/Sidebar';
import { useModalContext } from '~/context/modal';
import Categories from '~/containers/categories/Categories';

const Header = () => {
  const auth = true;
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { openModal } = useModalContext();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (newOpen: boolean) => {
    setDrawerOpen(newOpen);
  };

  const handleCatalogBtnClick = () => {
    openModal({
      component: <Categories />,
      paperProps: {
        sx: { width: '100%' },
      },
    });
  };

  return (
    <Container>
      <AppBar position="static" sx={styles.header}>
        <Toolbar>
          <Box sx={styles.leftSection}>
            {!isTablet ? (
              <>
                <ImgIcon />
                <Button
                  startIcon={<GridViewOutlinedIcon />}
                  variant="text"
                  onClick={handleCatalogBtnClick}
                >
                  Catalog
                </Button>
              </>
            ) : (
              <>
                <IconButton onClick={() => toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <Sidebar
                  open={drawerOpen}
                  toggleDrawer={toggleDrawer}
                  auth={auth}
                  handleCatalogBtnClick={handleCatalogBtnClick}
                />
              </>
            )}
          </Box>
          <Box sx={styles.centerSection}>
            <SearchBar />
          </Box>
          <Box sx={styles.lastSection}>
            <Box sx={styles.iconsWrapper}>
              <IconButton>
                {authRoutes.navBar.favorites.icon}
              </IconButton>
              <IconButton>
                {authRoutes.navBar.cart.icon}
              </IconButton>
            </Box>
            {!auth ?
              <Button variant="contained" size="small">Login</Button> : (
                <Box>
                  <IconButton
                    aria-haspopup="true"
                    onClick={handleMenu}
                  >
                    {authRoutes.navBar.myAccount.icon}
                  </IconButton>
                  <CustomMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>{authRoutes.navBar.myAccount.text}</MenuItem>
                    <MenuItem onClick={handleMenuClose}>{authRoutes.navBar.addProduct.text}</MenuItem>
                  </CustomMenu>
                </Box>
              )}
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;