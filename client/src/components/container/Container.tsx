import { Container as MuiContainer } from '@mui/material';
import { spliceSx } from '~/utils/helper-functions';
import { styles } from './container.styles';
import { ContainerProps } from '@mui/material';

const Container = ({children, sx}: ContainerProps) => {
  return (
    <MuiContainer
      maxWidth='xl'
      sx={spliceSx(styles.container, sx)}
    >
      {children}
    </MuiContainer>
  );
};

export default Container;
