import { Box, Button, TextField } from '@mui/material';
import { LoginFormValues, snackbarVariants } from '~/types';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styles } from '~/components/auth-form/styles';
import { useSnackbarContext } from '~/context/snackbar';
import { ErrorResponse } from '~/redux/api/types';
import { useLoginUserMutation } from '~/redux/api/authApi';

type LoginFormProps = {
  closeModal: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ closeModal }) => {
  const { setAlert } = useSnackbarContext();
  const [loginUser, { isLoading, isSuccess, error, isError }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: 'all',
  });

  useEffect(() => {
    if (isSuccess) {
      setAlert({
        severity: snackbarVariants.Success,
        message: 'User has successfully logged in',
      });
      closeModal();
    }

    if (isError) {
      setAlert({
        severity: snackbarVariants.Error,
        message: (error as ErrorResponse).data.message,
      });
    }
  }, [isLoading, closeModal, error, isError, setAlert, isSuccess]);

  const onSubmitHandler: SubmitHandler<LoginFormValues> = async (data) => {
    loginUser(data);
  };

  return (
    <Box
      onSubmit={handleSubmit(onSubmitHandler)}
      sx={styles.contentWrapper}
      component="form"
      noValidate
    >
      <Box sx={styles.textFieldsWrapper}>
        <TextField
          label="Email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
          required
        />
        <TextField
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
          required
        />
      </Box>
      <Button
        sx={styles.btn}
        loading={isLoading}
        variant="contained"
        fullWidth
        type="submit"
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;