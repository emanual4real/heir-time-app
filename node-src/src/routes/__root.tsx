import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { NavBar } from '../components';
import { Container } from '@mui/material';
import { AuthState } from '../context';

interface RouteContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => (
    <>
      <NavBar />
      <Container>
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </>
  )
});
