import { Menu, PopoverOrigin } from '@mui/material';

type AppMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  anchorOrigin:  PopoverOrigin | undefined;
  transformOrigin:  PopoverOrigin | undefined;
}

const AppMenu = ({anchorEl, open, handleClose, anchorOrigin, transformOrigin}: AppMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >

    </Menu>
  );
};

export default AppMenu;