import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { RouterProvider } from '@tanstack/react-router';
import { AuthProvider, AuthState } from './context';
import { router } from './router';

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const auth: AuthState = { loggedIn: false, user: {} };

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} context={{ auth }} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
