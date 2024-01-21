import { ReactElement, useState } from 'react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Box, IconButton } from '@mui/material';
import './Carousel.css';

interface CarouselProps {
  itemCount: number;
  itemsPerPage: number;
  children: ReactElement[];
}

export const Carousel = (props: CarouselProps) => {
  const [page, setPage] = useState<number>(props.itemCount / props.itemsPerPage);

  const firstItemIndex = page * props.itemsPerPage;
  const lastItemIndex = props.itemsPerPage * (page + 1);
  const maxPages =
    props.itemCount % props.itemsPerPage === 0
      ? (props.itemCount % props.itemsPerPage) - 1
      : Math.trunc(props.itemCount / props.itemsPerPage);

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < maxPages) {
      setPage(page + 1);
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
      <IconButton
        sx={{ backgroundColor: 'beige' }}
        disabled={page === 0}
        onClick={handlePreviousPage}>
        <ArrowBackIosRoundedIcon />
      </IconButton>
      {props.children.slice(firstItemIndex, lastItemIndex)}
      <IconButton
        sx={{ backgroundColor: 'beige' }}
        disabled={page === maxPages}
        onClick={handleNextPage}>
        <ArrowForwardIosRoundedIcon />
      </IconButton>
    </Box>
  );
};
