import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

interface CustomIconProps extends SvgIconProps {
  icon: React.ElementType;
}

const CustomIcon: React.FC<CustomIconProps> = ({ icon, ...props }) => {
  return <SvgIcon component={icon} {...props} inheritViewBox />;
}
export default CustomIcon;
