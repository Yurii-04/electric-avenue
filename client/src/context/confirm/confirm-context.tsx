import { createContext } from 'react';
import { IConfirmationDialogContext } from '~/context/confirm';

export const ConfirmationDialogContext =
  createContext<IConfirmationDialogContext>({} as IConfirmationDialogContext)