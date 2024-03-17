import { FormControl, FormGroup, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { format, parseISO } from 'date-fns';
import { Item } from '@ui/types';
import './ItemForm.css';

export interface ItemFormProps {
  item: Partial<Item>;
  onChange: (field: Partial<Item & { files?: FileList }>) => void;
}

export const ItemForm = (props: ItemFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange({ [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ?? undefined;

    props.onChange({ files });
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
    <FormGroup>
      <FormControl>
        <TextField
          id="title"
          name="title"
          label="Title"
          variant="filled"
          value={props.item.title ?? ''}
          required
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}></TextField>
      </FormControl>
      <FormControl>
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="filled"
          value={props.item.description ?? ''}
          rows={4}
          multiline
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}></TextField>
      </FormControl>
      <FormControl>
        <TextField
          id="location"
          name="location"
          label="Location"
          variant="filled"
          value={props.item.location ?? ''}
          required
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}></TextField>
      </FormControl>
      <FormControl>
        <TextField
          id="file-upload"
          name="file"
          label="Image upload"
          variant="filled"
          type="file"
          inputProps={{ accept: 'image/*' }}
          InputLabelProps={{ shrink: true }}
          onChange={handleFileChange}></TextField>
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
  );
};
