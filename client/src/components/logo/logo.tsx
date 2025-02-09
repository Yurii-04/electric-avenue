import Box from '@mui/material/Box';
import logo from '~/assets/logo.svg';
import { ComponentEnum } from '~/types';

const Logo = ({src = logo, alt = 'logo', ...props}) => {
  return (
    <Box
      component={ComponentEnum.Img}
      src={src}
      alt={alt}
      {...props}
    />
  );
};

export default Logo;
