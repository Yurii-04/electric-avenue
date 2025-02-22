import { useContext } from 'react';
import { ModalContext } from '~/context/modal/modal-context';

export const useModalContext = () => useContext(ModalContext);