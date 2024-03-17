import { useAuth } from '@ui/hooks';
import { ItemCarousel } from '..';
import { useEffect } from 'react';
import { getSelf } from '../../services/userService';

export const Home = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const autoLogin = async () => {
      if (!auth.loggedIn) {
        const user = await getSelf();

        if (user !== null) {
          setAuth({ loggedIn: true, user });
        }
      }
    };

    autoLogin();
  }, [auth.loggedIn, setAuth]);

  if (auth.loggedIn) {
    return <ItemCarousel isAdmin={false} />;
  }
  return <div>Home Page in Progress</div>;
};
