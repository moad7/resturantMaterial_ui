import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  Box,
} from '@mui/material';

const API_URL = 'http://127.0.0.1:3000';

function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [waiters, setWaiters] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [newDishId, setNewDishId] = useState('');
  const [newWaiterId, setNewWaiterId] = useState('');
  const location = useLocation();

  const [orderItem, setOrderItem] = useState(
    location.state?.orderDetails || null
  );
  const orders = location.state.orders;
  console.log(orderItem);

  useEffect(() => {
    axios
      .get(`${API_URL}/waiters`)
      .then((response) => setWaiters(response.data))
      .catch((err) => console.error('Error fetching waiters:', err));

    axios
      .get(`${API_URL}/dishes`)
      .then((response) => setDishes(response.data))
      .catch((err) => console.error('Error fetching dishes:', err));
  }, [id, orderItem]);

  const handleUpdateWaiter = async () => {
    await axios
      .put(`${API_URL}/waiters/updateWaitersOrder`, {
        idOrder: orderItem.idOrder,
        idWaiters: newWaiterId,
      })
      .then(() => {
        alert('✅ Waiter updated successfully!');
        setOrderItem({
          ...orderItem,
          waiterName: waiters.find((w) => w.idWaiters === parseInt(newWaiterId))
            .name,
        });
      })
      .catch((err) => console.error('Error updating waiter:', err));
  };

  const handleAddDish = async () => {
    if (!newDishId) {
      alert('⚠️ Please select a dish first.');
      return;
    }

    try {
      await axios.post(`${API_URL}/dishes/addDishToOrder`, {
        idOrder: orderItem.idOrder,
        idDishes: newDishId,
      });

      alert('✅ Dish added successfully!');

      const addedDish = orders?.length
        ? orders
            .flatMap((order) => order.dishes)
            .find((dish) => dish.idDishes === parseInt(newDishId))
        : null;

      if (!addedDish) {
        alert('⚠️ Dish not found in orders list!');
        return;
      }

      setOrderItem((prevOrder) => ({
        ...prevOrder,
        dishes: [...prevOrder.dishes, addedDish],
      }));
    } catch (err) {
      console.error('Error adding dish:', err);
      alert('❌ Failed to add dish.');
    }
  };

  const handleRemoveDish = async (dishId) => {
    await axios
      .delete(
        `${API_URL}/dishes/removeDishFromOrder/${orderItem.idOrder}/${dishId}`
      )
      .then(() => {
        alert('✅ Dish removed successfully!');
        setOrderItem({
          ...orderItem,
          dishes: orderItem.dishes.filter((dish) => dish.idDishes !== dishId),
        });
      })
      .catch((err) => console.error('Error removing dish:', err));
  };

  const handleDeleteOrder = async () => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    await axios
      .delete(`${API_URL}/order/deleteOrder/${orderItem.idOrder}`)
      .then(() => {
        alert('✅ Order deleted successfully!');
        navigate('/orders');
      })
      .catch((err) => console.error('Error deleting order:', err));
  };

  if (!orderItem) {
    return (
      <div className="container text-center mt-5">
        <h2>Loading order details...</h2>
      </div>
    );
  }

  return (
    <Box sx={{ background: '#f4f7fc', minHeight: '100vh', py: 4 }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate('/orders')}
        sx={{ mb: 4, borderRadius: 25, fontSize: '16px', padding: '8px 16px' }}
      >
        🔙 Back to Orders
      </Button>

      <Card
        sx={{
          boxShadow: 3,
          borderRadius: 4,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          maxWidth: '50%',
          margin: '0 auto',
        }}
      >
        <CardContent
          sx={{
            padding: '30px',
            textAlign: 'center',
            backgroundColor: '#f0f4f7',
          }}
        >
          <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
            🛒 Order #{orderItem.idOrder}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            <strong>📅 Date:</strong>{' '}
            {new Date(orderItem.date).toLocaleString()}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            <strong>👨‍🍳 Waiter:</strong> {orderItem.waiterName}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 700, mt: 1 }}>
            <strong>Total Price:</strong>{' '}
            {orderItem.dishes.reduce((sum, dish) => sum + dish.dishPrice, 0)}₪
          </Typography>

          <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
            <InputLabel>Waiter</InputLabel>
            <Select
              value={newWaiterId}
              onChange={(e) => setNewWaiterId(e.target.value)}
              label="Waiter"
              sx={{ borderRadius: 4 }}
            >
              {waiters.map((w) => (
                <MenuItem key={w.idWaiters} value={w.idWaiters}>
                  {w.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="warning"
            sx={{
              mb: 3,
              borderRadius: 25,
              padding: '8px 16px',
              textTransform: 'none',
            }}
            onClick={handleUpdateWaiter}
          >
            ✏️ Update Waiter
          </Button>

          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: 600, mt: 4 }}
          >
            🍽️ Ordered Dishes
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {orderItem.dishes.length > 0 ? (
              orderItem.dishes.map((dish) => (
                <Grid item key={dish.idDishes} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: 2,
                      '&:hover': { transform: 'scale(1.05)', boxShadow: 4 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={dish.dishImage || '/placeholder-image.jpg'}
                      alt={dish.dishName}
                      sx={{ objectFit: 'cover', borderRadius: '4px 4px 0 0' }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: 500, textAlign: 'center' }}
                      >
                        {dish.dishName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: 'center' }}
                      >
                        ₪{dish.dishPrice}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: 'center' }}
                      >
                        ⏳ {dish.dishTime} min
                      </Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ mt: 1, textTransform: 'none' }}
                        onClick={() => handleRemoveDish(dish.idDishes)}
                      >
                        🗑 Remove
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ gridColumn: 'span 3', textAlign: 'center' }}
              >
                No dishes in this order.
              </Typography>
            )}
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 500 }}>
              ➕ Add Dish to Order
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select a Dish</InputLabel>
              <Select
                value={newDishId}
                onChange={(e) => setNewDishId(e.target.value)}
                label="Select a Dish"
                sx={{ borderRadius: 4 }}
              >
                {dishes.map((d) => (
                  <MenuItem key={d.idDishes} value={d.idDishes}>
                    {d.name} - {d.price}₪
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="success"
              sx={{
                borderRadius: 25,
                padding: '8px 16px',
                textTransform: 'none',
              }}
              onClick={handleAddDish}
            >
              ➕ Add Dish
            </Button>
          </Box>

          <Button
            variant="contained"
            color="error"
            sx={{
              mt: 4,
              borderRadius: 25,
              padding: '8px 16px',
              textTransform: 'none',
            }}
            onClick={handleDeleteOrder}
          >
            🗑 Delete Order
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default OrderDetailsPage;
