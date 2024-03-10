import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { format, parseISO } from 'date-fns';
import { Bid, BidPayload, Item, ItemStatus } from '@ui/types';
import { BidDialog, DeleteDialog, EditItemDialog } from '..';

export interface ItemProps {
  item: Item;
  isAdmin?: boolean;
  handleDelete: (id: string) => void;
  handleEdit: (item: Item) => void;
  handleSubmitBid: (bid: BidPayload) => void;
}

export const ItemComponent = (props: ItemProps) => {
  const releaseDate = (): string => {
    if (props.item.releaseDate) {
      const date = parseISO(props.item.releaseDate);

      return format(date, 'yyyy-MM-dd');
    } else {
      return '';
    }
  };

  const onDeleteClick = () => {
    props.handleDelete(props.item.id);
  };

  const onEditClick = (item: Item) => {
    props.handleEdit(item);
  };

  const onBidClick = (bid: Bid) => {
    props.handleSubmitBid({
      value: bid.value,
      receivingDate: bid.receivingDate,
      itemId: props.item.id
    });
  };

  return (
    <Card sx={{ width: 400, minHeight: 700 }}>
      <CardMedia sx={{ height: 250 }} image={props.item.imagePath} title="item" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.item.description}
        </Typography>
        <br />
        <Typography variant="h6">Information</Typography>
        <ul>
          <li>Parting Date: {releaseDate()}</li>
          <li>Location: {props.item.location}</li>
          {props.item.itemStatus === ItemStatus.Decided ? (
            <li>
              Status: {props.item.statusName} - {props.item.recipient}
            </li>
          ) : (
            <li>Status: {props.item.statusName}</li>
          )}
        </ul>
        {props.item.itemStatus === ItemStatus.Undecided && (
          <div>
            Bids:
            <ul>
              {props.item.bids
                ?.sort((a, b) => (a.value > b.value ? -1 : 1))
                .map((row) => (
                  <li key={row.user}>
                    {row.value} - {row.user}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardActions>
        {props.item.itemStatus === ItemStatus.Undecided ? (
          <BidDialog item={props.item} onSubmit={onBidClick} />
        ) : null}
        {props.isAdmin ? <DeleteDialog handleDelete={onDeleteClick} /> : null}
        {props.isAdmin ? <EditItemDialog item={props.item} onSubmit={onEditClick} /> : null}
      </CardActions>
    </Card>
  );
};
