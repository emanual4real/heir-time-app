import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ItemStatus } from '../../types/enums/ItemStatus';

export interface ItemProps {
  description: string;
  title: string;
  releaseDate: string;
  location: string;
  status: ItemStatus;
  imagePath?: string;
  recipient?: string;
}
export const Item = (props: ItemProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={props.imagePath} title="item" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <br />
        <Typography variant="h6">Information</Typography>
        <ul>
          <li>Parting Date: {props.releaseDate}</li>
          <li>Location: {props.location}.</li>
          {props.status === ItemStatus.Decided ? (
            <li>
              Status: {props.status} - {props.recipient}
            </li>
          ) : (
            <li>Status: {props.status}</li>
          )}
        </ul>
      </CardContent>
      <CardActions>
        {props.status === ItemStatus.Undecided ? (
          <>
            <Button size="small">Bid Now</Button>
            <Button size="small">Learn More</Button>
          </>
        ) : null}
      </CardActions>
    </Card>
  );
};
