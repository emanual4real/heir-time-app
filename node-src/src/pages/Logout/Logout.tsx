import { Button } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { getSelf, logout } from '@ui/services';
import { User } from '@ui/types';
import { useState } from 'react';

export const Logout = () => {
  const queryClient = useQueryClient();
  // hooks
  const [enabled, setEnabled] = useState<boolean>(false);
  const navigate = useNavigate({ from: '/logout' });
  const user = queryClient.getQueryData<User>(['me']);
  useQuery({ queryKey: ['logout'], queryFn: logout, enabled });
  useQuery({ queryKey: ['me'], queryFn: getSelf, enabled });

  const handleOnClick = async () => {
    setEnabled(false);
    queryClient.setQueryData(['me'], null);
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
