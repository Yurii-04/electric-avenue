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
  Divider,
  ListItemText,
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
import LoginButton from '~/components/login-button/LoginButton';
import { useAppSelector } from '~/redux/store';
import { selectIsAuthenticated } from '~/redux/features/userSlice';
import { useLogoutUserMutation } from '~/redux/api/authApi';
import { guestRoutes } from '~/router/constants/guestRoutes';

const Header = () => {
  const [logoutUser] = useLogoutUserMutation();
  const isAuth = useAppSelector(selectIsAuthenticated);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { closeModal, openModal } = useModalContext();
  const { myAccount, addProduct, favorites } = authRoutes.navBar;

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
    if (!isAuth) {
      return <LoginButton size="small" />;
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
          <MenuItem component={Link} to={myAccount.route} onClick={handleMenuClose}>
            {myAccount.text}
          </MenuItem>
          <MenuItem component={Link} to={addProduct.route} onClick={handleMenuClose}>
            {addProduct.text}
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => {
            handleMenuClose();
            logoutUser();
          }}>
            <ListItemText primary="Logout" />
          </MenuItem>
        </CustomMenu>
      </Box>
    );
  };

  return (
    <Container component="header">
      <AppBar sx={styles.header} component="div">
        <Toolbar>
          <Box sx={styles.leftSection}>
            {!isTablet ? (
              <>
                <Link to={guestRoutes.home.route}><ImgIcon /></Link>
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
                  isAuth={isAuth}
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
            </Box>
            {renderLastSection()}
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
