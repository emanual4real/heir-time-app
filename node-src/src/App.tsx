import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { RouterProvider } from '@tanstack/react-router';
import { AuthProvider } from '@ui/context';
import { useAuth } from '@ui/hooks';
import { router } from './router';

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const RouterApp = () => {
  const { auth } = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterApp />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
