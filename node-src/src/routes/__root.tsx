import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { NavBar } from '../components';
import { Container } from '@mui/material';
import { AuthState, useAuth } from '../context';

interface RouteContext {
  auth: AuthState;
}

const RootComponent = () => {
  const { auth } = useAuth();

  return (
    <>
      <NavBar loggedIn={auth.loggedIn} />
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
