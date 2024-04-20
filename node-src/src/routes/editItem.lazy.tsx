import { createLazyFileRoute } from '@tanstack/react-router';
import { ItemCarousel } from '@ui/pages';

const EditItemFormWithProps = () => {
  return <ItemCarousel projectId={'adsfkjasdf'} isAdmin={true} />;
};

export const Route = createLazyFileRoute('/editItem')({
  component: EditItemFormWithProps
});
