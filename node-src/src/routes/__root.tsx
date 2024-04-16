import { rootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Container } from '@mui/material';
import { NavBar } from '@ui/components';
import { User } from '@ui/types';
import { useQueryClient } from '@tanstack/react-query';

interface RouteContext {
  user: User | null;
  loggedIn: boolean;
}

const RootComponent = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['me']);
  const loggedIn = user !== undefined;

  return (
    <>
      <NavBar loggedIn={loggedIn} isAdmin={user?.isAdmin} />
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
