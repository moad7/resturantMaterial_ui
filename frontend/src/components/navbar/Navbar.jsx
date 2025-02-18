import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ backgroundColor: '#76e2d6' }}>
        <Toolbar sx={{ color: 'black' }}>
          <IconButton
            edge="start"
            color="black"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Restaurant
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/orders">
            Orders
          </Button>
          <Button color="inherit" component={Link} to="/dishes">
            Dishes
          </Button>
          <Button color="inherit" component={Link} to="/waiters">
            Waiters
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/orders"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/dishes"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Dishes" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/waiters"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Waiters" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default Navbar;
