import { createFileRoute, redirect } from '@tanstack/react-router';
import { Admin } from '../pages/Admin/Admin';

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ context, location }) => {
    // TODO: not requested behavior, but working redirect based on auth context
    if (!context.auth.loggedIn) {
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
