import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete, Add, Visibility } from '@mui/icons-material';

const url = 'http://127.0.0.1:3000/order';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrdersWithDetails();
  }, []);

  const loadOrdersWithDetails = async () => {
    axios
      .get(`${url}/getAllOrdersWithDetails`)
      .then((response) => {
        const groupedOrders = response.data.reduce((acc, order) => {
          const existingOrder = acc.find((o) => o.idOrder === order.idOrder);
          if (existingOrder) {
            existingOrder.dishes.push({
              idDishes: order.idDishes,
              dishName: order.dishName,
              dishImage: order.dishImage,
              dishTime: order.dishTime,
              dishPrice: order.dishPrice,
            });
          } else {
            acc.push({
              idOrder: order.idOrder,
              waiterName: order.waiterName,
              dishes: [
                {
                  idDishes: order.idDishes,
                  dishName: order.dishName,
                  dishImage: order.dishImage,
                  dishTime: order.dishTime,
                  dishPrice: order.dishPrice,
                },
              ],
              totalPrice: order.count,
              date: order.date,
            });
          }
          return acc;
        }, []);
        setOrders(groupedOrders);
      })
      .catch((err) => console.error('Error fetching orders:', err));
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    await axios
      .delete(`${url}/deleteOrder/${id}`)
      .then(() => setOrders(orders.filter((o) => o.idOrder !== id)))
      .catch((err) => console.error('Error deleting order:', err));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" color="primary" textAlign="center" mb={3}>
        📦 Orders List
      </Typography>

      <Button
        variant="contained"
        color="success"
        startIcon={<Add />}
        component={Link}
        to="/orders/new"
        sx={{ mb: 3 }}
      >
        Add New Order
      </Button>

      <TableContainer component={Paper} elevation={4}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                #
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Order ID
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Waiter Name
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Dishes
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Total Price
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Date
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <TableRow
                  key={order.idOrder}
                  hover
                  onClick={() =>
                    navigate(`/orders/details/${order.idOrder}`, {
                      state: { orderDetails: order, orders: orders },
                    })
                  }
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.idOrder}</TableCell>
                  <TableCell>{order.waiterName}</TableCell>
                  <TableCell>
                    {order.dishes.map((dish) => dish.dishName).join(', ')}
                  </TableCell>
                  <TableCell>
                    {order.dishes.reduce(
                      (sum, dish) => sum + dish.dishPrice,
                      0
                    )}{' '}
                    ₪
                  </TableCell>
                  <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <Tooltip title="View Order Details">
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/orders/details/${order.idOrder}`, {
                            state: { orderDetails: order, orders: orders },
                          });
                        }}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order">
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteOrder(order.idOrder);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default OrdersPage;
