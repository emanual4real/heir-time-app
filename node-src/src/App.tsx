import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { Home } from './pages';
import { NavBar } from './components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Home />
    </ThemeProvider>
  );
}

export default App;
