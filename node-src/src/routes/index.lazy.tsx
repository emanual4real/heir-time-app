import { createLazyFileRoute } from '@tanstack/react-router';
import { Home } from '@ui/pages';

const IndexWithProps = () => {
  return <Home />;
};

export const Route = createLazyFileRoute('/')({
  component: IndexWithProps
});
