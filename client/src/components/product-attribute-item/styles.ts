import { theme } from '~/styles/app-theme';

export const styles = {
  accordion: {
    backgroundColor: 'inherit',
    boxShadow: 'none',
    borderBottom: '1px solid',
    borderColor: 'divider',
    '&:before': {
      display: 'none',
    },
  },
  accordionSummary: {
    padding: '5px 30px',
    minHeight: '48px',
    '& .MuiAccordionSummary-content': {
      margin: '12px 0',
    },
  },
  checkbox: {
    '&.Mui-checked': {
      color: theme.palette.success.main,
    }
  },
  attributeTitle: {
    fontWeight: 'medium',
  },
};