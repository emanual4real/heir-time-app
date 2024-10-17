import { ItemStatus, Option } from '@types';

export const itemStatusSelectOptions: Option[] = Object.entries(ItemStatus)
  .filter(([, val]) => typeof val === 'number')
  .map(([key, val]) => ({ value: val, label: key }));

export function getItemStatus(val: number) {
  return ItemStatus[val];
}
