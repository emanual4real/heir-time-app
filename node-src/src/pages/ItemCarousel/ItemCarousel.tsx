import { Box } from '@mui/material';
import { BidPayload, Item } from '@ui/types';
import { Carousel, ItemComponent } from '@ui/components';
import {
  useDeleteItemMutation,
  useGetItemsByProjectIdQuery,
  useSubmitItemBidMutation,
  useUpdateItemMutation
} from '../../services/api';
import './ItemCarousel.css';
export interface ItemCarouselProps {
  projectId: string;
  isAdmin?: boolean;
}

export const ItemCarousel = (props: ItemCarouselProps) => {
  const { data, isSuccess, isLoading } = useGetItemsByProjectIdQuery(props.projectId);

  const [deleteItem] = useDeleteItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const [submitBid] = useSubmitItemBidMutation();

  const handleDelete = async (id: number) => {
    deleteItem({ itemId: id, projectId: props.projectId });
  };

  const handleEdit = async (item: Item) => {
    updateItem({ ...item, projectId: props.projectId });
  };

  const handleSubmitBid = async (payload: BidPayload) => {
    submitBid(payload);
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
