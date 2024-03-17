import { Box, Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { NewItemDialog } from '@ui/components';
import { postItemWithFile } from '@ui/services';
import { Item } from '@ui/types';

export const Admin = () => {
  const navigate = useNavigate({ from: '/admin' });

  const onSubmit = (item: Partial<Item & { files: FileList }>) => {
    const newItem = { ...item };
    delete newItem.files;
    const { files } = item;

    postItemWithFile(newItem, files);
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
