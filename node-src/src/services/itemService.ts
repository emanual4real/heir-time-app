import { Item } from '@ui/types';
import { createRequestOptions } from './fetchOptions';
import { BidPayload } from '../types/models/Bid.model';
import { dateStringToFormat } from '@ui/utils';

const API_URL = `${import.meta.env.VITE_API_URL}/api/item`;

/**
 * Fetch specific item
 * @param id item id
 * @returns one item
 */
export const fetchItemById = async (id: string): Promise<Item> => {
  const options = createRequestOptions('GET');
  const response = await fetch(`${API_URL}/${id}`, options);

  return await response.json();
};

/**
 * Fetch all items
 * @returns List of Items
 */
export const fetchItems = async (): Promise<Item[]> => {
  const options = createRequestOptions('GET');
  const response = await fetch(`${API_URL}/items`, options);

  const rawItems: Item[] = await response.json();

  const modifiedItems = rawItems.map((item) => ({
    ...item,
    bids: item.bids?.map((bid) => ({
      ...bid,
      receivingDate: dateStringToFormat(bid.receivingDate, 'yyyy-MM-dd')
    }))
  }));

  return modifiedItems;
};

export const submitBid = async (bid: BidPayload): Promise<Item> => {
  const options = createRequestOptions('PUT', bid);
  const response = await fetch(`${API_URL}/bid`, options);

  return await response.json();
};

// ADMIN ONLY below here
export const postItem = async (item: Partial<Item>): Promise<Item[]> => {
  const options = createRequestOptions('POST', item);
  const response = await fetch(`${API_URL}`, options);

  return await response.json();
};

export const deleteItem = async (id: string): Promise<string> => {
  const options = createRequestOptions('DELETE');
  const response = await fetch(`${API_URL}/${id}`, options);

  if ([200, 202].includes(response.status)) {
    return id;
  } else {
    throw new Error(`${id} not found`);
  }
};

export const updateItem = async (item: Item): Promise<Item> => {
  const options = createRequestOptions('PUT', item);
  const response = await fetch(`${API_URL}`, options);

  if ([200].includes(response.status)) {
    return item;
  } else {
    throw new Error(response.statusText);
  }
};
