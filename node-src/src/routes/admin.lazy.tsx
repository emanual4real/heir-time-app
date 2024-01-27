import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/admin')({
  component: Admin
});

function Admin() {
  return <div className="p-2">Hello from Admin!</div>;
}
