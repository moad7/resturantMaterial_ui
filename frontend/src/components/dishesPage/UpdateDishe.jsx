import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import { Save, ArrowBack } from '@mui/icons-material';
const API_URL = 'http://127.0.0.1:3000/dishes';

function UpdateDishe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dishItem = location.state?.dishesDetails || {};
  console.log(dishItem);

  const [dish, setDish] = useState({
    name: dishItem.name || '',
    price: dishItem.price || '',
    time: dishItem.time || '',
    image: dishItem.image || '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [dishItem]);

  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .put(`${API_URL}/updateDishesById/${id}`, dish)
      .then(() => {
        alert('✅ Dish updated successfully!');
        navigate('/dishes');
      })
      .catch((err) => console.error('Error updating dish:', err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dishes')}
          sx={{ mb: 3 }}
        >
          Back to Dishes
        </Button>

        <Typography variant="h4" textAlign="center" mb={3} color="primary">
          🍽️ Edit Dish
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Dish Name"
            fullWidth
            variant="outlined"
            name="name"
            value={dish.name || ''}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price (₪)"
            type="number"
            fullWidth
            variant="outlined"
            name="price"
            value={dish.price || ''}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Preparation Time (min)"
            type="number"
            fullWidth
            variant="outlined"
            name="time"
            value={dish.time || ''}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Image URL"
            fullWidth
            variant="outlined"
            name="image"
            value={dish.image || ''}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {dish.image && (
            <Box textAlign="center" mb={2}>
              <img
                src={dish.image}
                alt="Preview"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Save />
              )
            }
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default UpdateDishe;
