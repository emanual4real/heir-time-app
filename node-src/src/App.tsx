import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { RouterProvider } from '@tanstack/react-router';
import { AuthContext, AuthState } from './context';
import { useState } from 'react';
import { router } from './router';

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const [auth, setAuth] = useState<AuthState>({ loggedIn: false, user: null });

  const value = { auth, setAuth };

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={value}>
        <RouterProvider router={router} context={{ auth }} />
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
