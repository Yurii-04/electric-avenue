import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { styles } from '~/containers/auth-form/styles';
import AuthSwitch from '~/components/auth-switch/AuthSwitch';
import { FormMode } from '~/types';
import LoginForm from '~/components/auth-form/LoginForm';
import RegisterForm from '~/components/auth-form/RegisterForm';

type AuthFormProps = {
  closeModal: () => void;
}

const AuthFormContainer: FC<AuthFormProps> = ({ closeModal }) => {
  const [mode, setMode] = useState<FormMode>('login');

  return (
    <Box sx={styles.root}>
      <AuthSwitch
        sx={styles.authSwitch}
        mode={mode}
        changeMode={setMode}
      />
      {mode === 'login' ? (
        <LoginForm closeModal={closeModal} />
      ) : (
        <RegisterForm closeModal={closeModal}/>
      )}
    </Box>
  );
};

export default AuthFormContainer;