import { createContext } from 'react';
import {SnackbarContextOutput } from '~/context/snackbar/types';

export const SnackbarContext = createContext({} as SnackbarContextOutput);
