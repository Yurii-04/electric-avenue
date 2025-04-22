import { Box, Paper, Skeleton, SxProps } from '@mui/material';
import { FC } from 'react';
import { spliceSx } from '~/utils/helper-functions';

interface AttributeFilterSkeletonProps {
  itemsCount?: number;
  sx: SxProps;
}

export const AttributeFilterSkeleton: FC<AttributeFilterSkeletonProps> = ({ sx, itemsCount = 8 }) => {
  return (
    <Paper elevation={0} sx={spliceSx(sx, { p: 2 })}>
      {Array.from({ length: itemsCount }, (_, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Skeleton variant="text" height={44} sx={{ mb: 1, width: '40%' }} />
          <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
        </Box>
      ))}
    </Paper>
  );
}; 