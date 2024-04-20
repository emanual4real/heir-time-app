import { rootRouteWithContext, Outlet } from '@tanstack/react-router';
import { Container } from '@mui/material';
import { NavBar } from '@ui/components';
import { User } from '@ui/types';
import { useGetSelfQuery } from '@ui/services';
import { Suspense } from 'react';
import React from 'react';

interface RouteContext {
  user: User | null;
  loggedIn: boolean;
}

const RootComponent = () => {
  const { data: user, isSuccess } = useGetSelfQuery();

  const TanStackRouterDevtools =
    import.meta.env.MODE !== 'dev'
      ? () => null // Render nothing in production
      : React.lazy(() =>
          // Lazy load in development
          import('@tanstack/router-devtools').then((res) => ({
            default: res.TanStackRouterDevtools
            // For Embedded Mode
            // default: res.TanStackRouterDevtoolsPanel
          }))
        );

  return (
    <>
      <NavBar loggedIn={isSuccess} isAdmin={user?.isAdmin} />
      <Container>
        <Outlet />
      </Container>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
};

export const Route = rootRouteWithContext<RouteContext>()({
  component: () => <RootComponent />
});
