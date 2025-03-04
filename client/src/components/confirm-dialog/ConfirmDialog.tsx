import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styles } from '~/components/confirm-dialog/styles';
import { Button } from '@mui/material';

type ConfirmDialogProps = {
  message: string;
  title: string;
  confirmButton?: string;
  cancelButton?: string;
  open: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = (
  {
    message,
    title,
    confirmButton,
    cancelButton,
    open,
    onConfirm,
    onDismiss,
  },
) => {
  return (
    <Dialog
      PaperProps={{ sx: styles.root }}
      onClose={onDismiss}
      open={open}
    >
      <Typography sx={styles.title}>{title}</Typography>
      <IconButton onClick={onDismiss} sx={styles.icon}>
        <CloseIcon />
      </IconButton>
      <DialogContent sx={styles.content}>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions sx={styles.actions}>
        <Button onClick={onConfirm}>
          {confirmButton || 'Yes'}
        </Button>
        <Button onClick={onDismiss} variant='text'>
          {cancelButton || 'No'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;