import { createFileRoute, redirect } from '@tanstack/react-router';
import { Admin } from '@ui/pages';

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ context, location }) => {
    // TODO: not requested behavior, but working redirect based on auth context
    if (!context.loggedIn) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  },
  component: Admin
});
