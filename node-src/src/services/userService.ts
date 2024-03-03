import { createRequestOptions } from './fetchOptions';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetch specific item
 * @param id item id
 * @returns one item
 */
export const login = async (emailAddress: string, password: string): Promise<object> => {
  const options = createRequestOptions('POST', { emailAddress, password });
  const response = await fetch(`${API_URL}/api/user/login`, options);

  return await response.json();
};

export const logout = async (): Promise<unknown> => {
  const options = createRequestOptions('GET');
  const response = await fetch(`${API_URL}/api/user/logout`, options);

  return await response.json();
};
