import { ThemeProvider } from '@mui/material';
import { theme } from './styles/app-theme';
import Header from './containers/layout/header/Header';
import CustomIcon from '~/components/custom-icon/CustomIcon';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <CustomIcon />
    </ThemeProvider>
  );
}
