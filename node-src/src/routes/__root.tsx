import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Container } from '@mui/material';
import { NavBar } from '@ui/components';
import { AuthState } from '@ui/context';
import { useAuth } from '@ui/hooks';

interface RouteContext {
  auth: AuthState;
}

const RootComponent = () => {
  const { auth } = useAuth();

  return (
    <>
      <NavBar loggedIn={auth.loggedIn} isAdmin={auth.user?.isAdmin} />
      <Container>
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => <RootComponent />
});
