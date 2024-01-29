import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { NewItemForm } from '../components';
import { postItem } from '../services';

const NewItemFormWithProps = () => {
  const navigate = useNavigate({ from: '/addItem' });

  return (
    <NewItemForm
      onSubmit={(item) => {
        postItem(item).finally(() => {
          navigate({ to: '/admin' });
        });
      }}
    />
  );
};

export const Route = createLazyFileRoute('/addItem')({
  component: NewItemFormWithProps
});
