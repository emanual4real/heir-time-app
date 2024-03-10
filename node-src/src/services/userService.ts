import { User } from '../types/models';
import { createRequestOptions } from './fetchOptions';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Used to log in if cookie is already present
 * @returns User
 */
export const getSelf = async (): Promise<User | null> => {
  try {
    const options = createRequestOptions('GET');
    const response = await fetch(`${API_URL}/api/user/me`, options);

    if (response.status === 401) {
      return null;
    }

    return await response.json();
  } catch (err) {
    return null;
  }
};

/**
 * Fetch specific item
 * @param id item id
 * @returns one item
 */
export const login = async (emailAddress: string, password: string): Promise<User> => {
  const options = createRequestOptions('POST', { emailAddress, password });
  const response = await fetch(`${API_URL}/api/user/login`, options);

  return await response.json();
};

export const logout = async () => {
  const options = createRequestOptions('GET');
  try {
    await fetch(`${API_URL}/api/user/logout`, options);
  } catch (err) {
    console.error('Not logged in');
  }
};
