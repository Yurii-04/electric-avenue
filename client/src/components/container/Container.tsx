import { Container as MuiContainer, ContainerProps } from '@mui/material';
import { spliceSx } from '~/utils/helper-functions';
import { styles } from './container.styles';
import { FC } from 'react';

const Container: FC<ContainerProps> = ({ children, sx, component = 'div' }) => {
  return (
    <MuiContainer
      maxWidth="xl"
      sx={spliceSx(styles.container, sx)}
      component={component}
    >
      {children}
    </MuiContainer>
  );
};

export default Container;
