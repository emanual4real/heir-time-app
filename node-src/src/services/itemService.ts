import { Item } from '../models/Item.model';
import { createRequestOptions } from './fetchOptions';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetch specific item
 * @param id item id
 * @returns one item
 */
export const fetchItemById = async (id: string): Promise<Item> => {
  const options = createRequestOptions('GET');
  const response = await fetch(`${API_URL}/api/item/${id}`, options);

  return await response.json();
};

/**
 * Fetch all items
 * @returns List of Items
 */
export const fetchItems = async (): Promise<Item[]> => {
  const options = createRequestOptions('GET');
  const response = await fetch(`${API_URL}/api/item`, options);

  return await response.json();
};

export const postItem = async (item: Partial<Item>): Promise<Item[]> => {
  const options = createRequestOptions('POST', item);
  const response = await fetch(`${API_URL}/api/item`, options);

  return await response.json();
};

export const deleteItem = async (id: string): Promise<string> => {
  const options = createRequestOptions('DELETE');
  const response = await fetch(`${API_URL}/api/item/${id}`, options);

  if ([200, 202].includes(response.status)) {
    return id;
  } else {
    throw new Error(`${id} not found`);
  }
};

export const updateItem = async (item: Item): Promise<Item> => {
  const options = createRequestOptions('PUT', item);
  const response = await fetch(`${API_URL}/api/item`, options);

  if ([200].includes(response.status)) {
    return item;
  } else {
    throw new Error(response.statusText);
  }
};
