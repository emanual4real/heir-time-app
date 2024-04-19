import { Box, Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { NewItemDialog } from '@ui/components';
import { PostPutItemMutationProps } from '@ui/types';
import { usePostItemMutation } from '../../services/api';

export const Admin = () => {
  const navigate = useNavigate({ from: '/admin' });
  const [addItem] = usePostItemMutation();

  const onSubmit = (newItem: PostPutItemMutationProps) => {
    addItem(newItem);
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
