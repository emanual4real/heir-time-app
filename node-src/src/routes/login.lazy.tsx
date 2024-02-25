import { createLazyFileRoute } from '@tanstack/react-router';
import { Login } from '../pages';

export const Route = createLazyFileRoute('/login')({
  component: Login
});
