import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getSelf } from './services';

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

const RouterApp = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ['me'],
    queryFn: getSelf,
    staleTime: 60 * 60 * 1000
  });

  return <RouterProvider router={router} context={{ user: data, loggedIn: isSuccess }} />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterApp />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
