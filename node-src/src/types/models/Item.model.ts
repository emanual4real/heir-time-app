import { ItemStatus } from '../enums/ItemStatus';

export interface Item {
  id: string;
  title: string;
  releaseDate: string;
  itemStatus: ItemStatus;
  statusName: string;
  description: string;
  location?: string;
  imagePath?: string;
  recipient?: string;
}
