import Box from '@mui/material/Box';
import logo from '~/assets/logo.svg';
import { ComponentEnum } from '~/types';
import { FC } from 'react';
import { SxProps, Theme } from '@mui/material';

type LogoProps = {
  src?: string | null;
  alt?: string;
  sx?: SxProps<Theme>
}

const ImgIcon: FC<LogoProps> = ({ src = logo, alt = 'img-icon', sx }) => {
  if (!src) {
    return null;
  }

  return (
    <Box
      component={ComponentEnum.Img}
      src={src}
      alt={alt}
      sx={sx}
    />
  );
};

export default ImgIcon;
