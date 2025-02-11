import * as React from 'react';
import { useState } from 'react';
import { styles } from './header.styles';
import { theme } from '~/styles/app-theme';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  AppBar,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import Container from '~/components/container/Container';
import Logo from '~/components/logo/logo';
import CustomIcon from '~/components/custom-icon/CustomIcon';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileIcon from '~/assets/img/common/profile.svg?react';

function Header() {
  const auth = true;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const leftSection =
    <Box sx={styles.leftSection}>
      {!isTablet ? (
        <>
          {!isTablet && <Logo />}
          <Button
            startIcon={<GridViewOutlinedIcon />}
            variant="text"
          >
            Catalog
          </Button>
        </>
      ) : (
        <IconButton>
          <MenuIcon />
        </IconButton>
      )}
    </Box>;

  const lastSection = !isMobile &&
    <Box sx={styles.lastSection}>
      <Box sx={styles.iconsWrapper}>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton>
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </Box>
      {!auth ?
        <Button variant="contained" sx={{ maxHeight: '120%' }}>Login</Button> : (
          <Box>
            <IconButton
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <CustomIcon icon={ProfileIcon} fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Add a product</MenuItem>
            </Menu>
          </Box>
        )}
    </Box>;

  return (
    <Container>
      <AppBar position="static" sx={styles.header}>
        <Toolbar>
          {leftSection}
          <Box sx={styles.centerSection}>
            <TextField
              variant="outlined"
              placeholder="I'm looking..."
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="start">
                      <Button
                        onClick={() => console.log('12')}
                      >
                        <SearchIcon cursor="pointer" />
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
          {lastSection}
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Header;