import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Badge,
} from '@mui/material';
import { Box, Container, Grid } from '@mui/material';
import DishesPage from '../dishesPage/DishesPage';
import { EmojiEvents, Fastfood } from '@mui/icons-material';
const API_BASE_URL = 'http://127.0.0.1:3000';

function Dashboard() {
  const [topWaiters, setTopWaiters] = useState([]);
  const [topDishes, setTopDishes] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/waiters/mostSellingWaiters`)
      .then((response) => setTopWaiters(response.data))
      .catch((err) => console.error('Error fetching top waiters:', err));

    axios
      .get(`${API_BASE_URL}/order/mostOrderedDishes`)
      .then((response) => setTopDishes(response.data))
      .catch((err) => console.error('Error fetching top dishes:', err));
  }, []);

  console.log(topDishes);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Top Selling Waiters */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
              avatar={<EmojiEvents color="success" />}
              title="Top Selling Waiters"
              sx={{ bgcolor: 'success.main', color: 'white' }}
            />
            <CardContent>
              {topWaiters.length > 0 ? (
                <List>
                  {topWaiters.map((waiter, index) => (
                    <ListItem
                      key={waiter.idWaiters}
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <ListItemText primary={`${index + 1}. ${waiter.name}`} />
                      <Badge
                        badgeContent={waiter.order_count}
                        color="success"
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography align="center" color="textSecondary">
                  No data available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Most Ordered Dishes */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
              avatar={<Fastfood color="secondary" />}
              title="Most Ordered Dishes"
              sx={{ bgcolor: 'secondary.main', color: 'white' }}
            />
            <CardContent>
              {topDishes.length > 0 ? (
                <List>
                  {topDishes.map((dish, index) => (
                    <ListItem
                      key={dish.idDishes}
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <ListItemText primary={`${index + 1}. ${dish.name}`} />
                      <Badge
                        badgeContent={dish.order_count}
                        color="secondary"
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography align="center" color="textSecondary">
                  No data available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <DishesPage />
    </Container>
  );
}

export default Dashboard;
