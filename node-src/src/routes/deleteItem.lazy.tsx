import { createLazyFileRoute } from '@tanstack/react-router';
import { Admin } from '../pages/Admin/Admin';

export const Route = createLazyFileRoute('/deleteItem')({
  component: Admin
});
