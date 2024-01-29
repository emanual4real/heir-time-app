import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ItemForm } from '..';
import { Item } from '../../models';

export interface NewItemDialogProps {
  onSubmit: (item: Partial<Item>) => void;
}

export const NewItemDialog = (props: NewItemDialogProps) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [form, setForm] = useState<Partial<Item>>();

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
            onChange={(formData) => {
              setDisabled(formData.disabled);
              setForm(formData.item);
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
