import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { Home } from './pages';
import { NavBar } from './components';
import { routeTree } from './routeTree.gen';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <RouterProvider router={router} />
      {/* <Home /> */}
    </ThemeProvider>
  );
}

export default App;
