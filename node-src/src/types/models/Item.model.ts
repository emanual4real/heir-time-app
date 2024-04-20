import { ItemStatus, Bid } from '@ui/types';

export type PostPutItemMutationProps = Partial<Item> & { projectId: string; files?: FileList };

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
