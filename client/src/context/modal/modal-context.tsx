import { createContext } from 'react';
import { ModalProvideContext } from '~/context/modal';

export const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext,
);