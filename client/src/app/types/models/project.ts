import { Item } from './item';

export interface Project {
  id: string;
  projectName: string;
  owner: string;
  admins: string[];
  users: string[];
  items: Item[];
}

export interface NewProjectPayload {
  projectName: string;
  admins: string[];
  users: string[];
  items: Item[];
}
