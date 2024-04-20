import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { format } from 'date-fns';
import { Bid, Item } from '@ui/types';
import { BiddingForm } from '..';
import { useGetSelfQuery } from '@ui/services';
import { User } from '../../types/openApi/models/User.model';

export interface BidDialogProps {
  item: Item;
  user?: User;
  onSubmit: (bid: Bid) => void;
}

export const BidDialog = (props: BidDialogProps) => {
  const userId = props.user?.id;
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
        maxWidth={'lg'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Place a bid on this item'}</DialogTitle>
        <DialogContent sx={{ width: '1000px' }}>
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

export const BidDialogReduxWrapper = (props: BidDialogProps) => {
  const { data: user } = useGetSelfQuery();

  return <BidDialog {...props} user={user} />;
};
