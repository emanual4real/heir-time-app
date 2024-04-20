import { createLazyFileRoute } from '@tanstack/react-router';
import { Register } from '@ui/pages';

export const Route = createLazyFileRoute('/register')({
  component: Register
});
