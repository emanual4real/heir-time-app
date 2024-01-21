import { useEffect, useState } from 'react';
import { fetchItems } from '../services/item-service';
import { Item } from '../models/Item.model';
import { ItemComponent } from '../components/Item';
import { Box, Container } from '@mui/material';

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItems();

      setItems(data);
    };

    getItems();
  }, []);
  return (
    <Container>
      Home
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
        {items.map((item) => (
          <ItemComponent key={item.id} item={item} />
        ))}
      </Box>
    </Container>
  );
};

export default Home;
