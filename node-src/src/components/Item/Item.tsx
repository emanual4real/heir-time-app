import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ItemStatus } from '../../types/enums/ItemStatus';
import { Item } from '../../models/Item.model';

export interface ItemProps {
  item: Item;
}
export const ItemComponent = (props: ItemProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={props.item.imagePath} title="item" />
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
          <li>Location: {props.item.location}.</li>
          {props.item.itemStatus === ItemStatus.Decided ? (
            <li>
              Status: {props.item.itemStatus} - {props.item.recipient}
            </li>
          ) : (
            <li>Status: {props.item.itemStatus}</li>
          )}
        </ul>
      </CardContent>
      <CardActions>
        {props.item.itemStatus === ItemStatus.Undecided ? (
          <>
            <Button size="small">Bid Now</Button>
            <Button size="small">Learn More</Button>
          </>
        ) : null}
      </CardActions>
    </Card>
  );
};
