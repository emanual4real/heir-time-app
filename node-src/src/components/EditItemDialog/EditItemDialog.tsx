import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ItemForm } from '..';
import { Item } from '../../models';

export interface EditItemDialogProps {
  item: Item;
  onSubmit: (item: Item) => void;
}

export const EditItemDialog = (props: EditItemDialogProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Item>(props.item);

  const disabled = form.title === '' || form.description === '' || form.location === '';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        Edit
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
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
