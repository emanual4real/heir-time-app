import { rootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Container } from '@mui/material';
import { NavBar } from '@ui/components';
import { User } from '@ui/types';
import { useGetSelfQuery } from '../services/api';

interface RouteContext {
  user: User | null;
  loggedIn: boolean;
}

const RootComponent = () => {
  const { data: user, isSuccess } = useGetSelfQuery();

  return (
    <>
      <NavBar loggedIn={isSuccess} isAdmin={user?.isAdmin} />
      <Container>
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = rootRouteWithContext<RouteContext>()({
  component: () => <RootComponent />
});
