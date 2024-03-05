import { Button } from '@mui/material';
import { logout } from '../../services';
import { useAuth } from '../../context';
import { useNavigate } from '@tanstack/react-router';

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
