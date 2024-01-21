import React, { useEffect } from 'react';
import { fetchItemById, fetchItems } from '../services/item-service';

const Home = () => {
  useEffect(() => {
    const getItem = async () => {
      const item = await fetchItems();

      console.log(item);
    };

    getItem();
  }, []);
  return <div>Home</div>;
};

export default Home;
