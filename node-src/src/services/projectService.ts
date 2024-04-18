import { Project } from '@ui/types';
import { createDefaultRequestOptions } from './fetchOptions';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/project`;

export const getOwnProjects = async (): Promise<Project[]> => {
  try {
    const options = createDefaultRequestOptions('GET');
    const response = await fetch(`${API_URL}`, options);

    return await response.json();
  } catch (err) {
    throw new Error('Error getting projects');
  }
};
