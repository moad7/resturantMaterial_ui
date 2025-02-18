import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Container,
  Box,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
const url = 'http://127.0.0.1:3000/dishes';

function DishesPage() {
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();
  const handleDeleteDish = (dishId) => {
    axios
      .delete(`${url}/deleteDishesById/${dishId}`)
      .then(() => {
        alert('✅ Dish removed successfully!');
        setDishes(dishes.filter((dish) => dish.idDishes !== dishId));
      })
      .catch((err) => console.error('Error removing dish:', err));
  };
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setDishes(response.data))
      .catch((err) => console.error('Error fetching dishes:', err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" color="primary">
          🍽️ Dishes Menu
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          component={Link}
          to="/dishes/new"
        >
          Add New Dish
        </Button>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {dishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dish.idDishes}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 3,
                transition: '0.3s',
                '&:hover': { transform: 'scale(1.05)' },
                textAlign: 'center',
                bgcolor: '#ddfffd',
              }}
            >
              {dish.image ? (
                <CardMedia
                  component="img"
                  image={dish.image}
                  alt={dish.name}
                  sx={{ height: 180, objectFit: 'cover' }}
                />
              ) : (
                <Box
                  height={180}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="#ddd"
                >
                  <Typography>No Image ❌</Typography>
                </Box>
              )}

              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {dish.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {dish.price}₪ 💰 | {dish.time} min ⏳
                </Typography>

                <Box display="flex" justifyContent="center" gap={1} mt={2}>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteDish(dish.idDishes)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<Edit />}
                    onClick={() =>
                      navigate(`/dishes/update/${dish.idDishes}`, {
                        state: { dishesDetails: dish },
                      })
                    }
                  >
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DishesPage;
