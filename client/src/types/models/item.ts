import { FormControl } from '@angular/forms';
import { ItemStatus } from '../enums';
import { Bid } from './bid';

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

export interface ItemFormGroup {
  title: FormControl<string | null>;
  releaseDate: FormControl<Date | null>;
  itemStatus: FormControl<ItemStatus | null>;
  description: FormControl<string | null>;
  location: FormControl<string | null>;
  recipient: FormControl<string | null>;
}
