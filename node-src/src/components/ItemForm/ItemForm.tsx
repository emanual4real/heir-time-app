import { FormControl, FormGroup, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { format, parseISO } from 'date-fns';
import { Item } from '@ui/types';

export interface ItemFormProps {
  item: Partial<Item>;
  onChange: (field: Partial<Item>) => void;
}

export const ItemForm = (props: ItemFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange({ [e.target.name]: e.target.value });
  };

  const releaseDate = (): string => {
    if (props.item.releaseDate) {
      const date = parseISO(props.item.releaseDate);

      return format(date, 'yyyy-MM-dd');
    } else {
      return '';
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
            value={props.item.title ?? ''}
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
            value={props.item.description ?? ''}
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
            value={props.item.location ?? ''}
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
            value={releaseDate()}
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
            value={props.item.statusName ?? ''}
            InputLabelProps={{ shrink: true }}
            disabled></TextField>
        </FormControl>
      </FormGroup>
    </form>
  );
};
