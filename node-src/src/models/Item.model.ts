import { ItemStatus } from '../types/enums/ItemStatus';

export interface Item {
  id: string;
  title: string;
  releaseDate: string;
  itemStatus: ItemStatus;
  description: string;
  location?: string;
  imagePath?: string;
  recipient?: string;
}
