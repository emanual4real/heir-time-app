import { Box, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';

export const Admin = () => {
  return (
    <Box>
      <Link to="/addItem" className="link">
        <Typography>Add new item</Typography>
      </Link>

      <Link to="/editItem" className="link">
        <Typography>Edit existing item</Typography>
      </Link>

      <Link to="/deleteItem" className="link">
        <Typography>Delete existing item</Typography>
      </Link>
    </Box>
  );
};
