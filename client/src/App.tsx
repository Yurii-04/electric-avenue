import { ThemeProvider } from '@mui/material';
import { theme } from './styles/app-theme';
import Header from './containers/layout/header/Header';
import { SnackbarProvider } from '~/context/snackbar';
import React from 'react';
import { ModalProvider } from '~/context/modal';
import { ConfirmationDialogProvider } from '~/context/confirm/confirm-provider';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <ConfirmationDialogProvider>
          <ModalProvider>
            <Header />
          </ModalProvider>
        </ConfirmationDialogProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
