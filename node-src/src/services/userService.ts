const API_URL = import.meta.env.VITE_API_URL;

/**
 * Fetch specific item
 * @param id item id
 * @returns one item
 */
export const login = async (emailAddress: string, password: string): Promise<unknown> => {
  const options: RequestInit = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ emailAddress, password }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch(`${API_URL}/api/user/authenticate`, options);

  return await response.json();
};
