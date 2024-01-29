import { FormControl, FormGroup, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { ItemStatus } from '../../types/enums/ItemStatus';
import { format } from 'date-fns';
import { Item } from '../../models';

export interface ItemFormProps {
  item?: Item;
  onChange: (form: { item: Partial<Item>; disabled: boolean }) => void;
}

export const ItemForm = (props: ItemFormProps) => {
  const [formData, setFormData] = useState<Partial<Item>>({
    title: props.item?.title ?? '',
    description: props.item?.description ?? '',
    location: props.item?.location ?? '',
    releaseDate: props.item?.releaseDate ?? format(new Date(), 'yyyy-MM-dd'),
    itemStatus: props.item?.itemStatus ?? ItemStatus.Undecided
  });

  const disabled = formData.title === '' || formData.description === '' || formData.location === '';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (props.onChange) {
      props.onChange({ item: formData, disabled });
    }
  };

  return (
    <form>
      <FormGroup>
        <FormControl>
          <TextField
            id="title"
            name="title"
            label="Title"
            helperText="Give a meaningful title to this item"
            variant="filled"
            value={formData.title}
            required
            onChange={handleChange}></TextField>
        </FormControl>
        <FormControl>
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="filled"
            helperText="Provide any additional information"
            value={formData.description}
            rows={4}
            multiline
            required
            onChange={handleChange}></TextField>
        </FormControl>
        <FormControl>
          <TextField
            id="location"
            name="location"
            label="Location"
            variant="filled"
            helperText="Where is this item located?"
            value={formData.location}
            required
            onChange={handleChange}></TextField>
        </FormControl>
        <FormControl>
          <TextField
            id="releaseDate"
            name="releaseDate"
            label="Release Date"
            variant="filled"
            type="date"
            value={formData.releaseDate}
            helperText="When will this item become available?"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}></TextField>
        </FormControl>
        <FormControl>
          <TextField
            id="itemStatus"
            name="itemStatus"
            label="Status"
            variant="filled"
            value={ItemStatus[0]}
            InputLabelProps={{ shrink: true }}
            disabled></TextField>
        </FormControl>
      </FormGroup>
    </form>
  );
};
