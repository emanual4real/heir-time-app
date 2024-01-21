import { Item } from '../models/Item.model';

const API_URL = 'http://dotnet-api:8080';

export const fetchItemById = async (id: string): Promise<Item> => {
  const response = await fetch(`${API_URL}/api/item/${id}`);

  return await response.json();
};
