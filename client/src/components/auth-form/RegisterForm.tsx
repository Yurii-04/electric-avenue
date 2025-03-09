import { Box, Button, TextField } from '@mui/material';
import { RegisterFormValues, snackbarVariants } from '~/types';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styles } from '~/components/auth-form/styles';
import { emailValidation, nameValidation, passwordValidation } from '~/utils/validations/auth-validation';
import { useRegisterUserMutation } from '~/redux/api/authApi';
import { useSnackbarContext } from '~/context/snackbar';
import { ErrorResponse } from '~/redux/api/types';

type RegisterFormProps = {
  closeModal: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ closeModal }) => {
  const { setAlert } = useSnackbarContext();
  const [registerUser, { isLoading, isSuccess, error, isError }] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: 'all',
  });

  useEffect(() => {
    if (isSuccess) {
      setAlert({
        severity: snackbarVariants.Success,
        message: 'User has successfully registered',
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

  const onSubmitHandler: SubmitHandler<RegisterFormValues> = (values) => {
    registerUser(values);
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
          {...register('email', emailValidation)}
          error={!!errors.email}
          helperText={errors.email?.message}
          required
        />
        <TextField
          required
          label="Password"
          type="password"
          {...register('password', passwordValidation)}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          required
          label="First Name"
          {...register('firstName', nameValidation('First Name is required'))}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          required
          label="Last Name"
          {...register('lastName', nameValidation('Last Name is required'))}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </Box>
      <Button
        sx={styles.btn}
        loading={isLoading}
        variant="contained"
        fullWidth
        type="submit"
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;