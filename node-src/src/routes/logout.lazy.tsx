import { createLazyFileRoute } from '@tanstack/react-router';
import { Logout } from '@ui/pages';

export const Route = createLazyFileRoute('/logout')({
  component: Logout
});
