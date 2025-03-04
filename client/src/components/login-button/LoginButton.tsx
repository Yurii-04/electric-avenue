import { FC } from 'react';
import { Button } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useModalContext } from '~/context/modal';
import AuthForm from '~/containers/auth-form/AuthForm';

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
        component: <AuthForm closeModal={closeModal} />,
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