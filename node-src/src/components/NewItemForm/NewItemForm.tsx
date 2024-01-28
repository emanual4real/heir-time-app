import { Button, FormControl, FormGroup, TextField } from '@mui/material';
import React, { useState } from 'react';
import { ItemStatus } from '../../types/enums/ItemStatus';
import { format } from 'date-fns';
import { Item } from '../../models';

export interface NewItemFormProps {
  onSubmit: (form: Partial<Item>) => void;
}

export const NewItemForm = (props: NewItemFormProps) => {
  const [formData, setFormData] = useState<Partial<Item>>({
    title: '',
    description: '',
    location: '',
    releaseDate: format(new Date(), 'yyyy-MM-dd'),
    itemStatus: ItemStatus.Undecided
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}></TextField>
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
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}></TextField>
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
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}></TextField>
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
            onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}></TextField>
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
      <Button type="submit" variant="contained" color="primary" style={{ float: 'right' }}>
        Submit
      </Button>
    </form>
  );
};
