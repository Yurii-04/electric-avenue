import { Container as MuiContainer, ContainerProps } from '@mui/material';
import { spliceSx } from '~/utils/helper-functions';
import { styles } from './container.styles';

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
