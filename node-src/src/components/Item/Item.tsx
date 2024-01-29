import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ItemStatus } from '../../types/enums/ItemStatus';
import { Item } from '../../models/Item.model';
import { DeleteDialog, EditItemDialog } from '..';

export interface ItemProps {
  item: Item;
  isAdmin?: boolean;
  handleDelete: (id: string) => void;
  handleEdit: (item: Item) => void;
}
export const ItemComponent = (props: ItemProps) => {
  const onDeleteClick = () => {
    props.handleDelete(props.item.id);
  };

  const onEditClick = (item: Item) => {
    props.handleEdit(item);
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia sx={{ height: 300 }} image={props.item.imagePath} title="item" />
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
          <li>Parting Date: {props.item.releaseDate}</li>
          <li>Location: {props.item.location}</li>
          {props.item.itemStatus === ItemStatus.Decided ? (
            <li>
              Status: {props.item.statusName} - {props.item.recipient}
            </li>
          ) : (
            <li>Status: {props.item.statusName}</li>
          )}
        </ul>
      </CardContent>
      <CardActions>
        {props.item.itemStatus === ItemStatus.Undecided ? (
          <>
            <Button size="small">Bid Now</Button>
          </>
        ) : null}
        {props.isAdmin ? <DeleteDialog handleDelete={onDeleteClick} /> : null}
        {props.isAdmin ? <EditItemDialog item={props.item} onSubmit={onEditClick} /> : null}
      </CardActions>
    </Card>
  );
};
