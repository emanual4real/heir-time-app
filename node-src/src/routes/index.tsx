import { createFileRoute } from '@tanstack/react-router';
import { ItemCarousel } from '../pages/ItemCarousel';
import { Login } from '../pages';

const isAuthenticated = () => true;

const IndexWithProps = () => {
  return <ItemCarousel isAdmin={false} />;
};

export const Route = createFileRoute('/')({
  component: () => {
    if (isAuthenticated()) {
      return IndexWithProps();
    } else {
      // return <Login />;
    }
  }
});
