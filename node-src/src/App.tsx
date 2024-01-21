import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
