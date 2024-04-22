import { ReactNode, useState } from 'react';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export interface DialogProps {
  buttonText: string;
  children: ReactNode;
  dialogTitle: string;
  submitDisabled: boolean;
  onSubmit: () => void;
}

export const Dialog = (props: DialogProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="text" onClick={handleClickOpen}>
        {props.buttonText}
      </Button>
      <MuiDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button onClick={props.onSubmit} autoFocus disabled={props.submitDisabled}>
            Submit
          </Button>
        </DialogActions>
      </MuiDialog>
    </>
  );
};
