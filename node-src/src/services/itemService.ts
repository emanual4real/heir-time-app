import { Item, BidPayload, AddItemMutationProps } from '@ui/types';
import { createDefaultRequestOptions } from './fetchOptions';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/item`;
// const API_URL = `/api/item`;
/**
 * Fetch specific item
 * @param id item id
 * @returns one item
 */
export const fetchItemById = async (id: string): Promise<Item> => {
  const options = createDefaultRequestOptions('GET');
  const response = await fetch(`${API_URL}/${id}`, options);

  return await response.json();
};

/**
 * Fetches all items from a project
 * @param projectId string
 * @returns list of items
 */
export const fetchItemsByProjectId = async (projectId: string): Promise<Item[]> => {
  const options = createDefaultRequestOptions('GET');
  const response = await fetch(`${API_URL}?projectId=${projectId}`, options);

  return await response.json();
};

export const submitBid = async (bid: BidPayload): Promise<Item> => {
  const options = createDefaultRequestOptions('PUT', bid);
  const response = await fetch(`${API_URL}/bid`, options);

  return await response.json();
};

// ADMIN ONLY below here
export const postItem = async (item: Partial<Item>): Promise<Item> => {
  const options = createDefaultRequestOptions('POST', item);
  const response = await fetch(API_URL, options);

  return await response.json();
};

export const postItemWithFile = async (
  item: AddItemMutationProps,
  files?: FileList
): Promise<Item> => {
  const myHeaders = new Headers();
  myHeaders.append('accept', 'text/plain');

  const formdata = new FormData();

  formdata.append('itemJson', JSON.stringify(item));
  if (files) {
    formdata.append('file', files[0], files[0].name);
  }

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
    credentials: 'include'
  };

  const response = await fetch(API_URL, requestOptions);

  return await response.json();
};

export const deleteItem = async (id: number, projectId: string): Promise<number> => {
  const options = createDefaultRequestOptions('DELETE');
  const response = await fetch(`${API_URL}/${id}?projectId=${projectId}`, options);

  if ([200, 202].includes(response.status)) {
    return id;
  } else {
    throw new Error(`${id} not found`);
  }
};

export const updateItem = async (item: Item, projectId: string): Promise<Item> => {
  const options = createDefaultRequestOptions('PUT', { ...item, projectId });
  const response = await fetch(`${API_URL}`, options);

  if ([200].includes(response.status)) {
    return item;
  } else {
    throw new Error(response.statusText);
  }
};
