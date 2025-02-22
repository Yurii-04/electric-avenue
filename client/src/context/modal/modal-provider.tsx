import React, { FC, useCallback, useMemo, useState } from 'react';
import { PaperProps } from '@mui/material';
import { Component, ModalContext } from '~/context/modal';
import PopupDialog from '~/components/popup-dialog/PopupDialog';

type ModalProviderProps = {
  children: React.ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<React.ReactElement | null>(null);
  const [paperProps, setPaperProps] = useState<PaperProps>({});
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const closeModal = useCallback(() => {
    setModal(null);
    setPaperProps({});
    setTimer(null);
  }, [setModal, setPaperProps, setTimer]);

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000);
      setTimer(timerId);
    },
    [closeModal],
  );

  const openModal = useCallback(
    ({ component, paperProps }: Component, delayToClose?: number) => {
      setModal(component);

      if (paperProps) {
        setPaperProps(paperProps);
      }
      if (delayToClose) {
        closeModalAfterDelay(delayToClose);
      }
    },
    [setModal, setPaperProps, closeModalAfterDelay],
  );

  const contextValue = useMemo(
    () => ({ openModal, closeModal }),
    [closeModal, openModal],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <PopupDialog
          closeModalAfterDelay={closeModalAfterDelay}
          content={modal}
          paperProps={paperProps}
          timerId={timer}
          closeOnly={true}
        />
      )}
    </ModalContext.Provider>
  );
};
