import { mainShadow } from '~/styles/app-theme';

export const styles = {
  wrapper: {
    my: 2,
    display: { xs: 'block', md: 'grid' },
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridAutoRows: 'auto',
    gap: 1,
    '& > .MuiBox-root': {
      boxShadow: mainShadow,
    },
  },
  leftSection: {
    height: 'fit-content',
    mb: { xs: 1, md: 0 },
  },
  rightSection: {
    height: 'fit-content',
    '& > .MuiBox-root:nth-of-type(1), & > .MuiBox-root:nth-of-type(2)': {
      mb: 1,
    },
  },
};
