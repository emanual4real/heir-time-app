import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import './NavBar.css';

export interface NavBarProps {
  loggedIn?: boolean;
  isAdmin?: boolean;
}

export const NavBar = (props: NavBarProps) => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: '30px' }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Link to="/" className="nav-link">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                <img src="/favicon.ico" />
                <Typography variant="h5" component="div" sx={{ marginLeft: '10px', flexGrow: 15 }}>
                  Heir Time
                </Typography>
              </Box>
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              flexGrow: 1
            }}>
            {props.isAdmin && (
              <Link to="/admin" className="nav-link">
                <Typography variant="h6" component="div" sx={{ marginLeft: '10px' }}>
                  Admin
                </Typography>
              </Link>
            )}

            {!props.loggedIn ? (
              <Link to="/login" className="nav-link">
                <Typography variant="h6" component="div" sx={{ marginLeft: '10px' }}>
                  Login
                </Typography>
              </Link>
            ) : (
              <Link to="/logout" className="nav-link">
                <Typography variant="h6" component="div" sx={{ marginLeft: '10px' }}>
                  Logout
                </Typography>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
