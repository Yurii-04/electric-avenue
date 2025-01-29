import { ThemeProvider } from '@mui/material';
import { theme } from './styles/app-theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  );
}
