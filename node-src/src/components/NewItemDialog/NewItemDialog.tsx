import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { format } from 'date-fns';
import { ItemForm } from '..';
import { Item, ItemStatus, PostPutItemMutationProps } from '@ui/types';
import { useSelector } from 'react-redux';
import { selectCurrentProject } from '../../state';

export interface NewItemDialogProps {
  onSubmit: (newItem: PostPutItemMutationProps) => void;
}

export const NewItemDialog = (props: NewItemDialogProps) => {
  const currentProject = useSelector(selectCurrentProject);

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
  const [file, setFile] = useState<FileList | undefined>(undefined);

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
    if (form && currentProject) {
      const payload: PostPutItemMutationProps = {
        ...form,
        projectId: currentProject,
        files: file
      };

      props.onSubmit(payload);
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
            uploadFile={(newFile) => {
              setFile(newFile);
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
