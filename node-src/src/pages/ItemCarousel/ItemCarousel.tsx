import { Box } from '@mui/material';
import { deleteItem, fetchItemsByProjectId, submitBid, updateItem } from '@ui/services';
import { BidPayload, DeleteMutationProps, EditMutationProps, Item } from '@ui/types';
import { Carousel, ItemComponent } from '@ui/components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import './ItemCarousel.css';
export interface ItemCarouselProps {
  projectId: string;
  isAdmin?: boolean;
}

export const ItemCarousel = (props: ItemCarouselProps) => {
  const queryClient = useQueryClient();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: () => fetchItemsByProjectId(props.projectId),
    staleTime: 60 * 60 * 1000
  });

  const deleteMutation = useMutation({
    mutationFn: (deleteProps: DeleteMutationProps) => {
      return deleteItem(deleteProps.itemId, deleteProps.projectId);
    },
    onSettled: async () => {
      queryClient.invalidateQueries({
        queryKey: ['items']
      });
    }
  });

  const editMutation = useMutation({
    mutationFn: (editProps: EditMutationProps) => {
      return updateItem(editProps.item, editProps.projectId);
    },
    onSettled: async () => {
      queryClient.invalidateQueries({
        queryKey: ['items']
      });
    }
  });

  const bidMutation = useMutation({
    mutationFn: (bid: BidPayload) => {
      return submitBid(bid);
    },
    onSettled: async () => {
      queryClient.invalidateQueries({
        queryKey: ['items']
      });
    }
  });

  const handleDelete = async (id: number) => {
    deleteMutation.mutate({ itemId: id, projectId: props.projectId });
  };

  const handleEdit = async (item: Item) => {
    editMutation.mutate({ item, projectId: props.projectId });
  };

  const handleSubmitBid = async (payload: BidPayload) => {
    bidMutation.mutate(payload);
    // TODO: bid on items
    // const response = await submitBid(payload);
    // const itemIndex = items.findIndex((row) => row.id === response.id);
    // const updatedItems = [...items];
    // updatedItems[itemIndex] = response;
    // setItems(updatedItems);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <Carousel itemCount={data.length} itemsPerPage={2}>
          {data.map((item) => (
            <ItemComponent
              key={item.id}
              projectId={props.projectId}
              item={item}
              isAdmin={props.isAdmin}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleSubmitBid={handleSubmitBid}
            />
          ))}
        </Carousel>
      </Box>
    );
  }
};
