import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { ReactComponent as StarIcon } from '~/assets/logo.svg';

const CustomIcon = (props: SvgIconProps) => (
  <SvgIcon component={StarIcon} {...props} inheritViewBox />
);

export default CustomIcon;


// <SvgIcon fontSize={fontSize} color={color} component={component ?? 'svg'} inheritViewBox />;
