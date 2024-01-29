import { createLazyFileRoute } from '@tanstack/react-router';
import { ItemCarousel } from '../pages/ItemCarousel';

const DeleteItemFormWithProps = () => {
  return <ItemCarousel isAdmin={true} />;
};

export const Route = createLazyFileRoute('/deleteItem')({
  component: DeleteItemFormWithProps
});
