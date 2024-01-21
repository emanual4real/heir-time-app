import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { EndowmentStatus } from '../../types/enums/EndowmentStatus';

export interface EndowmentProps {
  description: string;
  title: string;
  releaseDate: string;
  location: string;
  status: EndowmentStatus;
  imagePath?: string;
  recipient?: string;
}
export const Endowment = (props: EndowmentProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={props.imagePath} title="endowment" />
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
          {props.status === EndowmentStatus.Decided ? (
            <li>
              Status: {props.status} - {props.recipient}
            </li>
          ) : (
            <li>Status: {props.status}</li>
          )}
        </ul>
      </CardContent>
      <CardActions>
        {props.status === EndowmentStatus.Undecided ? (
          <>
            <Button size="small">Bid Now</Button>
            <Button size="small">Learn More</Button>
          </>
        ) : null}
      </CardActions>
    </Card>
  );
};
