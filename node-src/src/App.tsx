import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { Provider } from 'react-redux';
import { store } from './store';
import { useGetSelfQuery } from './services/api';

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const RouterApp = () => {
  const { data, isSuccess } = useGetSelfQuery();

  return <RouterProvider router={router} context={{ user: data, loggedIn: isSuccess }} />;
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterApp />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
