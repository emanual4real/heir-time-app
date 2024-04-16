import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { format } from 'date-fns';
import { Bid, Item, User } from '@ui/types';
import { BiddingForm } from '..';
import { useQueryClient } from '@tanstack/react-query';

export interface BidDialogProps {
  item: Item;
  onSubmit: (bid: Bid) => void;
}

export const BidDialog = (props: BidDialogProps) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<User>(['me']);

  const userId = data?.id;
  const userBid = props.item.bids?.find((bid) => bid.user === userId);
  const defaultDate = format(Date.now(), 'yyyy-MM-dd');
  const defaultBid: Bid = {
    value: 5,
    receivingDate: defaultDate
  };

  const [open, setOpen] = useState(false);
  const [bid, setBid] = useState<Bid>(userBid ?? defaultBid);

  const handleDiscard = () => {
    setBid(userBid ?? defaultBid);

    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    props.onSubmit(bid);
    handleClose();
  };

  const handleChange = (newBid: Bid) => {
    setBid(newBid);
  };

  return (
    <>
      <Button variant="text" onClick={handleClickOpen}>
        Bid Now
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Delete this item forever?'}</DialogTitle>
        <DialogContent>
          <BiddingForm bid={bid} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiscard}>Discard</Button>
          <Button onClick={handleSubmit} autoFocus disabled={false}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
