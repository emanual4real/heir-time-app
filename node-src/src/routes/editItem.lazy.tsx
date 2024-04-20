import { createLazyFileRoute } from '@tanstack/react-router';
import { ItemCarousel } from '@ui/components';

const EditItemFormWithProps = () => {
  return <ItemCarousel />;
};

export const Route = createLazyFileRoute('/editItem')({
  component: EditItemFormWithProps
});
