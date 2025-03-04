import { Box } from '@mui/material';
import { FC } from 'react';

type AuthFormProps = {
  closeModal: () => void;
}

const AuthForm: FC<AuthFormProps> = ({closeModal}) => {
  console.log(closeModal);
  return (
    <Box component='form'>

    </Box>
  );
};

export default AuthForm;