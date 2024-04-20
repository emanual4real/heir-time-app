import { createLazyFileRoute } from '@tanstack/react-router';
import { Login } from '@ui/pages';

export const Route = createLazyFileRoute('/login')({
  component: Login
});
