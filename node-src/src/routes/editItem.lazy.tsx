import { createLazyFileRoute } from '@tanstack/react-router';
import { ItemCarousel } from '../pages/ItemCarousel';

const EditItemFormWithProps = () => {
  return <ItemCarousel projectId={'adsfkjasdf'} isAdmin={true} />;
};

export const Route = createLazyFileRoute('/editItem')({
  component: EditItemFormWithProps
});
