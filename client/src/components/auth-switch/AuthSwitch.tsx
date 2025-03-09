import { FC } from 'react';
import { Box, Button, SxProps, Theme } from '@mui/material';
import { styles } from '~/components/auth-switch/styles';
import { spliceSx } from '~/utils/helper-functions';
import { FormMode } from '~/types';

type AuthSwitchProps = {
  sx?: SxProps<Theme>,
  mode: FormMode,
  changeMode: (mode: FormMode) => void;
}

const AuthSwitch: FC<AuthSwitchProps> = ({ sx, mode, changeMode }) => {
  const getTabStyles = (tab: FormMode) =>
    spliceSx(
      styles.borderRadius,
      mode === tab ? styles.activeTab : undefined,
    );

  return (
    <Box sx={sx}>
      <Box sx={styles.root}>
        <Button
          onClick={() => changeMode('login')}
          sx={getTabStyles('login')}
        >
          Login
        </Button>
        <Button
          onClick={() => changeMode('register')}
          sx={getTabStyles('register')}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default AuthSwitch;