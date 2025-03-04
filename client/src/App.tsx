import { ThemeProvider } from '@mui/material';
import { theme } from './styles/app-theme';
import { SnackbarProvider } from '~/context/snackbar';
import React from 'react';
import { ModalProvider } from '~/context/modal';
import { ConfirmationDialogProvider } from '~/context/confirm/confirm-provider';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <Outlet />
          </ModalProvider>
        </ConfirmationDialogProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
