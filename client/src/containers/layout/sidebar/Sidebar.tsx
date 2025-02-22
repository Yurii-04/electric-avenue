import * as React from 'react';
import { cloneElement, FC, JSX } from 'react';
import { Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { commonStyles } from '~/styles/common-styles/common-styles';
import { authRoutes } from '~/router/constants/authRoutes';
import { guestRoutes } from '~/router/constants/guestRoutes';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { styles } from '~/containers/layout/sidebar/styles';
import CustomIcon from '~/components/custom-icon/CustomIcon';
import logo from '~/assets/logo.svg?react';

type SidebarProps = {
  open: boolean
  toggleDrawer: (newOpen: boolean) => void
  auth: boolean
  handleCatalogBtnClick: () => void
}

type NavItem = {
  icon: JSX.Element
  text: string
  path: string
}

const Sidebar: FC<SidebarProps> = ({ open, toggleDrawer, auth, handleCatalogBtnClick }) => {
  const renderNavList = (arr: NavItem[]) => (
    <List>
      {arr.map(({ icon, text }, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton sx={commonStyles.alignItemsCenter} onClick={() => toggleDrawer(false)}>
            {cloneElement(icon, { sx: { paddingRight: '10px' } })}
            <ListItemText>{text}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Drawer open={open} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation">
        <IconButton onClick={() => toggleDrawer(false)} sx={styles.iconBtn}>
          <CloseRoundedIcon />
        </IconButton>
        <Box>
          <List>
            <ListItem sx={styles.logoLi}>
              <CustomIcon icon={logo} sx={{ width: '100%' }} />
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
          </List>
          <Divider />
        </Box>
        <Box sx={styles.secondSection}>
          {renderNavList(Object.values(auth ? authRoutes.navBar : guestRoutes.navBar))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;