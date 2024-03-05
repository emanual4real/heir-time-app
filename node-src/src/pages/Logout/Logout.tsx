import { Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@ui/hooks';
import { logout } from '@ui/services';

export const Logout = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate({ from: '/logout' });

  const handleOnClick = async () => {
    await logout();

    setAuth({ loggedIn: false, user: null });
    navigate({ to: '/' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
      <Button variant="text" disabled={!auth.loggedIn} onClick={handleOnClick}>
        Logout
      </Button>
    </div>
  );
};
