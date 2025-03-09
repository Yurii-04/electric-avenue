import { FC } from 'react';
import { Button } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useModalContext } from '~/context/modal';
import AuthFormContainer from '~/containers/auth-form/AuthForm';
import { styles } from '~/components/login-button/styles';

type LoginButtonProps = {
  onClick?: () => void;
  fullWidth?: boolean;
  startIcon?: boolean;
  sx?: object;
  size?: 'small' | 'medium' | 'large';
}

const LoginButton: FC<LoginButtonProps> = ({ onClick, fullWidth = false, startIcon, size = 'medium', sx }) => {
  const { openModal, closeModal } = useModalContext();
  const handleClick = () => {
    openModal({
        component: <AuthFormContainer closeModal={closeModal} />,
        paperProps: { sx: styles.paperProps },
      },
    );
    onClick?.();
  };

  return (
    <Button
      variant="contained"
      size={size}
      fullWidth={fullWidth}
      sx={sx}
      startIcon={startIcon && <AccountCircleRoundedIcon fontSize="large" />}
      onClick={handleClick}
      aria-label="Login"
    >
      Login
    </Button>
  );
};

export default LoginButton;