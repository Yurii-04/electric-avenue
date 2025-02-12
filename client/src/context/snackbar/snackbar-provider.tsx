import React, { useCallback, useMemo, useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { snackbarVariants } from '~/types';
import Box from '@mui/material/Box';
import { SetAlertProps, SnackbarContext } from '~/context/snackbar';

type SnackbarProviderProps = {
  children: React.ReactNode;
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>(snackbarVariants.Info);
  const [message, setMessage] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);

  const setAlert = useCallback((options: SetAlertProps) => {
    setShow(true);
    setSeverity(options.severity);
    setMessage(options.message);
    setDuration(options.duration || 4000);
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const contextValue = useMemo(() => ({ setAlert }), [setAlert]);

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={duration}
        open={show}
        onClose={handleClose}
      >
        <Alert
          severity={severity}
          sx={{ color: 'basic.white' }}
          variant="filled"
        >
          <Box>
            {message}
          </Box>
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
