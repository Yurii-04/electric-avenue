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
import { Link } from 'react-router-dom';

const Header = () => {
  const auth = true;
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { closeModal, openModal } = useModalContext();
  const { myAccount, addProduct, favorites, cart } = authRoutes.navBar;

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
      component: <Categories closeModal={closeModal} />,
      paperProps: {
        sx: { minWidth: '270px' },
      },
    });
  };

  const renderLastSection = () => {
    if (!auth) {
      return <Button variant="contained" size="small">Login</Button>;
    }
    return (
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
          <MenuItem onClick={handleMenuClose}>
            <Link to={myAccount.route}>{myAccount.text}</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to={addProduct.route}>{addProduct.text}</Link>
          </MenuItem>
        </CustomMenu>
      </Box>
    );
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
              <IconButton component={Link} to={favorites.route}>{favorites.icon}</IconButton>
              <IconButton component={Link} to={cart.route}>{cart.icon}</IconButton>
            </Box>
            {renderLastSection()}
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
