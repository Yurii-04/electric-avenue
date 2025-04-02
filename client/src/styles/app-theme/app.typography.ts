import { TypographyOptions } from '@mui/material/styles/createTypography';

export const appTypography: TypographyOptions = {
  fontFamily: ['Rubik', '-apple-system', 'Arial', 'sans-serif'].join(','),
  h1: {
    fontWeight: 800,
    fontSize: 'clamp(52px, 5vw, 72px)',
    letterSpacing: '-1.5px',
    lineHeight: 'clamp(58px, 6vw, 85px)',
  },
  h2: {
    fontWeight: 600,
    fontSize: 'clamp(40px, 4.5vw, 61px)',
    lineHeight: 'clamp(60px, 6vw, 92px)',
    letterSpacing: '-0.5px',
  },
  h3: {
    fontWeight: 500,
    fontSize: 'clamp(32px, 4vw, 49px)',
    lineHeight: 'clamp(48px, 5vw, 74px)',
  },
  h4: {
    fontWeight: 500,
    fontSize: 'clamp(24px, 3vw, 35px)',
    lineHeight: 'clamp(36px, 4vw, 53px)',
  },
  h5: {
    fontWeight: 500,
    fontSize: 'clamp(18px, 2.5vw, 24px)',
    lineHeight: 'clamp(28px, 3.5vw, 36px)',
  },
  h6: {
    fontWeight: 500,
    fontSize: 'clamp(16px, 2vw, 20px)',
    lineHeight: 'clamp(24px, 3vw, 28px)',
    letterSpacing: '0.15px',
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: 'clamp(16px, 1.8vw, 18px)',
    lineHeight: 'clamp(20px, 2.5vw, 24px)',
    letterSpacing: '0.15px',
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: 'clamp(14px, 1.6vw, 16px)',
    lineHeight: 'clamp(18px, 2vw, 20px)',
    letterSpacing: '0.1px',
  },
  body1: {
    fontWeight: 400,
    fontSize: 'clamp(16px, 1.8vw, 18px)',
    lineHeight: 'clamp(20px, 2.5vw, 24px)',
    letterSpacing: '0.5px',
  },
  body2: {
    fontWeight: 400,
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    lineHeight: 'clamp(18px, 2vw, 20px)',
    letterSpacing: '0.0025em',
  },
  caption: {
    fontWeight: 400,
    fontSize: 'clamp(12px, 1.2vw, 14px)',
    lineHeight: 'clamp(14px, 1.8vw, 20px)',
    letterSpacing: '0.4px',
  },
  overline: {
    fontWeight: 400,
    fontSize: 'clamp(8px, 1vw, 10px)',
    lineHeight: 'clamp(12px, 1.5vw, 15px)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 500,
    fontSize: 'clamp(14px, 1.8vw, 16px)',
    lineHeight: 'clamp(20px, 2.5vw, 24px)',
    letterSpacing: '0.5px',
    textTransform: 'initial',
  },
};