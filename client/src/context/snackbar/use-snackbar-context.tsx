import { useContext } from 'react';
import { SnackbarContext } from '~/context/snackbar';

export const useSnackbarContext = () => useContext(SnackbarContext);
