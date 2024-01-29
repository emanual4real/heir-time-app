import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { fetchItems } from '../../services';
import { Item } from '../../models';
import { Carousel, ItemComponent } from '../../components';
import './Home.css';

export const Home = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItems();

      setItems(data);
    };

    getItems();
  }, []);
  return (
    <Box className="home-container">
      <Carousel itemCount={items.length} itemsPerPage={2}>
        {items.map((item) => (
          <ItemComponent key={item.id} item={item} />
        ))}
      </Carousel>
    </Box>
  );
};
