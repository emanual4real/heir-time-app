import { ItemStatus } from '../enums/ItemStatus';
import { Bid } from './Bid.model';

export type AddItemMutationProps = Item & { projectId: string };

export interface DeleteItemMutationProps {
  itemId: number;
  projectId: string;
}

export interface EditItemMutationProps {
  item: Item;
  projectId: string;
}
export interface Item {
  id: number;
  title: string;
  releaseDate: string;
  itemStatus: ItemStatus;
  statusName: string;
  description: string;
  location?: string;
  imagePath?: string;
  recipient?: string;
  bids: Bid[];
  fileKeys: string[];
  fileUrls: string[];
}
