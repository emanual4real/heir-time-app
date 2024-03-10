import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { deleteItem, updateItem, fetchItems, submitBid } from '@ui/services';
import { BidPayload, Item } from '@ui/types';
import { Carousel, ItemComponent } from '@ui/components';
import './ItemCarousel.css';

export interface ItemCarouselProps {
  isAdmin?: boolean;
}

export const ItemCarousel = (props: ItemCarouselProps) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (items.length === 0) {
      const getItems = async () => {
        const data = await fetchItems();

        setItems(data);
      };

      getItems();
    }
  }, [items]);

  const handleDelete = async (id: string) => {
    const deletedId = await deleteItem(id);

    if (deletedId) {
      setItems(items.filter((row) => row.id !== deletedId));
    }
  };

  const handleEdit = async (item: Partial<Item>) => {
    const originalItem = items.find((row) => row.id === item.id);
    const newItem = { ...originalItem, ...item } as Item;
    const response = await updateItem(newItem);

    if (response) {
      const updatedList = items.filter((row) => row.id !== response.id);
      updatedList.push(response);
      setItems(updatedList);
    }
  };

  const handleSubmitBid = async (payload: BidPayload) => {
    const response = await submitBid(payload);
    const itemIndex = items.findIndex((row) => row.id === response.id);

    const updatedItems = items;
    updatedItems[itemIndex] = response;

    setItems(updatedItems);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
      <Carousel itemCount={items.length} itemsPerPage={2}>
        {items.map((item) => (
          <ItemComponent
            key={item.id}
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
};
