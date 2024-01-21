import { ReactElement } from 'react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Box, Button } from '@mui/material';
import './Carousel.css';

interface CarouselProps {
  itemCount: number;
  children: ReactElement;
}

interface ArrowsProps {
  left?: boolean;
}
const Arrows = (props: ArrowsProps) => (
  <Button
    variant="left-arrow"
    endIcon={props.left ? <ArrowBackIosRoundedIcon /> : <ArrowForwardIosRoundedIcon />}></Button>
);

export const Carousel = (props: CarouselProps) => {
  return (
    <Box>
      <Arrows left={false} />
      <Arrows left={true} />

      <Box>{props.children}</Box>
    </Box>
  );
};
