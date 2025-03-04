import React, { FC, useState } from 'react';
import { Dialog, DialogProps, IconButton, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { styles } from '~/components/popup-dialog/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog';

type PopupDialogProps = {
  content: React.ReactNode
  paperProps: DialogProps['PaperProps']
  timerId: NodeJS.Timeout | null
  closeOnly?: boolean
  closeModalAfterDelay: (delay?: number) => void
}

const PopupDialog: FC<PopupDialogProps> = (
  {
    content,
    paperProps,
    timerId,
    closeModalAfterDelay,
    closeOnly = false,
  },
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  const handleMouseOver = () => timerId && clearTimeout(timerId);
  const handleMouseLeave = () => timerId && closeModalAfterDelay();
  const handleClose = () => closeModalAfterDelay(0);

  const handleConfirm = () => {
    setConfirmDialogOpen(false);
    handleClose();
  };

  const handleDismiss = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <>
      <Dialog
        PaperProps={paperProps}
        disableRestoreFocus
        fullScreen={isMobile}
        maxWidth="xl"
        onClose={handleClose}
        open
      >
        <Box
          onMouseLeave={handleMouseLeave}
          onMouseOver={handleMouseOver}
          sx={styles.box}
        >
          <IconButton
            onClick={() => closeOnly ? handleClose() : setConfirmDialogOpen(true)}
            sx={styles.icon}
          >
            <CloseRoundedIcon />
          </IconButton>
          <Box sx={styles.contentWrapper}>{content}</Box>
        </Box>
      </Dialog>
      {!closeOnly && (
        <ConfirmDialog
          message="Are you certain you want to close? Any unsaved changes will be lost"
          title="Please Confirm"
          onConfirm={handleConfirm}
          onDismiss={handleDismiss}
          open={isConfirmDialogOpen}
        />
      )}
    </>
  );
};

export default PopupDialog;