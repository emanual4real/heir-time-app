import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { routeTree } from './routeTree.gen';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { AuthContext, AuthState } from './context';
import { useState } from 'react';

// Create a new router instance
const router = createRouter({ routeTree });

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
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
