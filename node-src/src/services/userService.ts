import { User } from '../types/models';
import { createDefaultRequestOptions } from './fetchOptions';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/user`;
// const API_URL = `/api/user`;
/**
 * Used to log in if cookie is already present
 * @returns User
 */
export const getSelf = async (): Promise<User | null> => {
  try {
    const options = createDefaultRequestOptions('GET');
    const response = await fetch(`${API_URL}/me`, options);

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
  console.log('VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL);
  const options = createDefaultRequestOptions('POST', { emailAddress, password });
  const response = await fetch(`${API_URL}/login`, options);

  return await response.json();
};

export const logout = async () => {
  const options = createDefaultRequestOptions('GET');
  try {
    await fetch(`${API_URL}/logout`, options);
  } catch (err) {
    console.error('Not logged in');
  }
};
