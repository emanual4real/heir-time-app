import { createLazyFileRoute } from '@tanstack/react-router';
import { ItemCarousel } from '../pages/ItemCarousel';

const IndexWithProps = () => {
  return <ItemCarousel isAdmin={false} />;
};

export const Route = createLazyFileRoute('/')({
  component: IndexWithProps
});
