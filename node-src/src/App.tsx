import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <h1>stuff</h1>
    </ThemeProvider>
  );
}

export default App;
