import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { deleteItem, fetchItems } from '../../services';
import { Item } from '../../models';
import { Carousel, ItemComponent } from '../../components';
import './ItemCarousel.css';

export interface ItemCarouselProps {
  isAdmin?: boolean;
}

export const ItemCarousel = (props: ItemCarouselProps) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItems();

      setItems(data);
    };

    getItems();
  }, []);

  const handleDelete = async (id: string) => {
    const deletedId = await deleteItem(id);

    if (deletedId) {
      setItems(items.filter((row) => row.id !== deletedId));
    }
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
          />
        ))}
      </Carousel>
    </Box>
  );
};
