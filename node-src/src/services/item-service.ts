import { Item } from '../models/Item.model';

const API_URL = 'http://localhost:8080';

/**
 * Fetch specific item
 * @param id item id
 * @returns one item
 */
export const fetchItemById = async (id: string): Promise<Item> => {
  const response = await fetch(`${API_URL}/api/item/${id}`);

  return await response.json();
};

/**
 * Fetch all items
 * @returns List of Items
 */
export const fetchItems = async (): Promise<Item[]> => {
  const response = await fetch(`${API_URL}/api/item`);

  return await response.json();
};
