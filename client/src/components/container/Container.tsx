import { Container as MuiContainer, ContainerProps } from '@mui/material';
import { FC } from 'react';

const Container: FC<ContainerProps> = ({ children, sx, component = 'div' }) => {
  return (
    <MuiContainer
      maxWidth="xl"
      sx={sx}
      component={component}
    >
      {children}
    </MuiContainer>
  );
};

export default Container;
