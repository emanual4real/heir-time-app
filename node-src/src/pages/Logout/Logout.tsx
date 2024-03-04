import { Button } from '@mui/material';
import { logout } from '../../services';
import { useContext } from 'react';
import { AuthContext } from '../../context';

export const Logout = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const handleOnClick = async () => {
    await logout();

    setAuth({ loggedIn: false, user: null });
  };

  return (
    <Button variant="text" disabled={!auth.loggedIn} onClick={handleOnClick}>
      Logout
    </Button>
  );
};
