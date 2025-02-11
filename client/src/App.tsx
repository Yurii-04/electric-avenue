import { ThemeProvider } from '@mui/material';
import { theme } from './styles/app-theme';
import Header from './containers/layout/header/Header';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
}
