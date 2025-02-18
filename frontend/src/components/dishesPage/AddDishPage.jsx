import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Add } from '@mui/icons-material';

const url = 'http://127.0.0.1:3000/dishes/addNewDishes';

export default function AddDishPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !time) {
      alert('⚠️ Please fill in all required fields!');
      return;
    }

    setLoading(true);
    axios
      .post(
        url,
        { name, price, time, image: image || null },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(() => {
        alert('✅ Dish added successfully!');
        navigate('/dishes');
      })
      .catch((err) => console.error('Error adding dish:', err))
      .finally(() => setLoading(false));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" textAlign="center" mb={3} color="primary">
          🍽️ Add New Dish
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Dish Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price (₪)"
            type="number"
            fullWidth
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Preparation Time (min)"
            type="number"
            fullWidth
            variant="outlined"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Image URL (Optional)"
            fullWidth
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            sx={{ mb: 2 }}
          />

          {image && (
            <Box textAlign="center" mb={2}>
              <img
                src={image}
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
            color="success"
            fullWidth
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : <Add />
            }
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Dish'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
