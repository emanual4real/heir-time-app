import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ItemForm } from '..';
import { Item } from '@ui/types';
import { useSelector } from 'react-redux';
import { selectCurrentProject } from '../../state';

export interface EditItemDialogProps {
  item: Item;
  onSubmit: (item: FormData) => void;
}

export const EditItemDialog = (props: EditItemDialogProps) => {
  const currentProject = useSelector(selectCurrentProject);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Item>(props.item);
  const [file, setFile] = useState<FileList | undefined>(undefined);

  const disabled = form.title === '' || form.description === '' || form.location === '';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickYes = () => {
    if (form) {
      const formdata = new FormData();
      formdata.append('itemJson', JSON.stringify({ ...form, projectId: currentProject }));

      if (file) {
        formdata.append('file', file[0], file[0].name);
      }

      props.onSubmit(formdata);
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
            uploadFile={(newFile) => {
              setFile(newFile);
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
