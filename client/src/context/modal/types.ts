import React from 'react';
import { PaperProps } from '@mui/material';

export type Component = {
  component: React.ReactElement
  paperProps?: PaperProps
}

export type ModalProvideContext = {
  openModal: (component: Component, delayToClose?: number) => void
  closeModal: () => void
}