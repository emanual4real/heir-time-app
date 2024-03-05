import { useAuth } from '@ui/hooks';
import { ItemCarousel } from '..';

export const Home = () => {
  const { auth } = useAuth();

  if (auth.loggedIn) {
    return <ItemCarousel isAdmin={false} />;
  }
  return <div>Home Page in Progress</div>;
};
