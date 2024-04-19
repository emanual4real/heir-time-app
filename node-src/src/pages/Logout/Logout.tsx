import { Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useGetSelfQuery, useLogoutMutation } from '@ui/services';

export const Logout = () => {
  // hooks
  const navigate = useNavigate({ from: '/logout' });
  const { data: user } = useGetSelfQuery();
  const [logout] = useLogoutMutation();

  const handleOnClick = async () => {
    logout();
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
      <Button variant="text" disabled={!user} onClick={handleOnClick}>
        Logout
      </Button>
    </div>
  );
};
