import { Button } from '@mui/material';
import { logout } from '../../services';
import { ReactElement } from 'react';

export interface LogoutProps {
  children: ReactElement;
}

export const Logout = (props: LogoutProps) => {
  const handleOnClick = () => {
    logout();
  };

  return (
    <Button variant="text" onClick={handleOnClick}>
      Logout
    </Button>
  );
};
