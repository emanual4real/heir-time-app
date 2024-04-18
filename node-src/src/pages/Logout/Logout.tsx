import { Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { logout } from '@ui/services';
import { User } from '@ui/types';

export const Logout = () => {
  const queryClient = useQueryClient();
  // hooks
  const navigate = useNavigate({ from: '/logout' });
  const user = queryClient.getQueryData<User>(['me']);

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSettled: async () => {
      queryClient.setQueryData(['me'], () => null);
      queryClient.setQueryData(['project'], () => null);
      queryClient.setQueryData(['items'], () => []);
    }
  });

  const handleOnClick = async () => {
    logoutMutation.mutate();
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
