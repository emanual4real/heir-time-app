import { ItemCarousel } from '..';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@ui/types';

export const Home = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['me']);

  if (user) {
    return <ItemCarousel isAdmin={false} />;
  }

  return <div>Home Page in Progress</div>;
};
