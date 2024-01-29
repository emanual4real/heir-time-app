import { Box, Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { NewItemDialog } from '../../components';
import { postItem } from '../../services';
import { Item } from '../../models';

export const Admin = () => {
  const navigate = useNavigate({ from: '/admin' });

  const onSubmit = (item: Partial<Item>) => {
    postItem(item);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <NewItemDialog onSubmit={onSubmit} />
      <Button variant="text" onClick={() => navigate({ to: '/editItem' })}>
        Edit or Delete items
      </Button>
    </Box>
  );
};
