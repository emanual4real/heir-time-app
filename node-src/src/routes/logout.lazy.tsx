import { createLazyFileRoute } from '@tanstack/react-router';
import { Logout } from '../pages';

export const Route = createLazyFileRoute('/logout')({
  component: Logout
});
