const API_URL = 'http://localhost:61633';

export const fetchItemById = async (id: string): Endow => {
  const response = await fetch(`${API_URL}/api/item/${id}`);

  return await response.json();
};
