import {
  Button,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000';

function AddOrderPage() {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [waiterId, setWaiterId] = useState('');
  const [waiters, setWaiters] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // 🔹 Store total price
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    await axios
      .get(`${API_URL}/waiters`)
      .then((response) => setWaiters(response.data))
      .catch((err) => console.error('Error fetching waiters:', err));

    await axios
      .get(`${API_URL}/dishes`)
      .then((response) => setDishes(response.data))
      .catch((err) => console.error('Error fetching dishes:', err));
  };

  const handleDishSelection = (e) => {
    const selectedOptions = [...e.target.selectedOptions].map(
      (opt) => opt.value
    );
    setSelectedDishes(selectedOptions);

    // 🔹 Calculate the total price based on selected dishes
    const total = selectedOptions.reduce((sum, dishId) => {
      const dish = dishes.find((d) => d.idDishes.toString() === dishId);
      return dish ? sum + dish.price : sum;
    }, 0);

    setTotalPrice(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!waiterId || selectedDishes.length === 0) {
      alert('⚠️ Please select a waiter and at least one dish!');
      return;
    }

    setLoading(true);
    await axios
      .post(`${API_URL}/order/addOrder`, {
        idDishes: selectedDishes,
        idWaiters: waiterId,
        count: totalPrice,
      })
      .then(() => {
        alert('✅ Order added successfully!');
        navigate('/orders');
      })
      .catch((err) => console.error('Error adding order:', err))
      .finally(() => setLoading(false));
  };

  return (
    <Box sx={{ background: '#f4f7fc', minHeight: '100vh', py: 4 }}>
      <Card sx={{ maxWidth: '500px', margin: '0 auto', boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}
          >
            🛒 Add New Order
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Waiter</InputLabel>
              <Select
                value={waiterId}
                onChange={(e) => setWaiterId(e.target.value)}
                required
                label="Select Waiter"
                sx={{ borderRadius: 4 }}
              >
                <MenuItem value="">Choose a waiter</MenuItem>
                {waiters.map((w) => (
                  <MenuItem key={w.idWaiters} value={w.idWaiters}>
                    {w.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="dishes-label">Select Dishes</InputLabel>
              <Select
                labelId="dishes-label"
                multiple
                value={selectedDishes}
                onChange={(e) => setSelectedDishes(e.target.value)}
                required
                sx={{ borderRadius: 4 }}
                renderValue={(selected) =>
                  selected
                    .map((dishId) => {
                      const dish = dishes.find((d) => d.idDishes === dishId);
                      return dish ? `${dish.name} - ${dish.price}₪` : '';
                    })

                    .join(', ')
                }
              >
                {dishes.map((dish) => (
                  <MenuItem key={dish.idDishes} value={dish.idDishes}>
                    {dish.name} - {dish.price}₪
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 500, mb: 2 }}
            >
              Total Price:
              <span className="badge bg-warning">{totalPrice}₪</span>
            </Typography>

            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ width: '100%', padding: '10px 0', borderRadius: 25 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Place Order ➕'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AddOrderPage;
