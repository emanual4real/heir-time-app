import { Item } from './Item.model';

export interface Project {
  id: string;
  projectName: string;
  owner: string;
  admins: string[];
  users?: string[];
  items: Item[];
}
