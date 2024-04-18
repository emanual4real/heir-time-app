import { Box, Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { NewItemDialog } from '@ui/components';
import { postItemWithFile } from '@ui/services';
import { AddItemMutationProps, Item } from '@ui/types';

export const Admin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: '/admin' });

  const addItemMutation = useMutation({
    mutationFn: (item: AddItemMutationProps) => {
      return postItemWithFile(item);
    },
    onSettled: async () => {
      queryClient.invalidateQueries({
        queryKey: ['items']
      });
    }
  });

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
