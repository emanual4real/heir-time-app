import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ItemForm } from '..';
import { Item } from '../../models';
import { ItemStatus } from '../../types/enums/ItemStatus';
import { format } from 'date-fns';

export interface NewItemDialogProps {
  onSubmit: (item: Partial<Item>) => void;
}

export const NewItemDialog = (props: NewItemDialogProps) => {
  const defaultState: Partial<Item> = {
    title: '',
    description: '',
    releaseDate: format(new Date(), 'yyyy-MM-dd'),
    location: '',
    itemStatus: 0,
    statusName: ItemStatus[ItemStatus.Undecided]
  };

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Item>>(defaultState);

  const disabled = form.title === '' || form.description === '' || form.location === '';

  const resetState = () => {
    setForm(defaultState);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const handleClickYes = () => {
    if (form) {
      props.onSubmit(form);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="text" onClick={handleClickOpen}>
        Add new item
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Delete this item forever?'}</DialogTitle>
        <DialogContent>
          <ItemForm
            item={form}
            onChange={(field) => {
              setForm({ ...form, ...field });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button onClick={handleClickYes} autoFocus disabled={disabled}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
