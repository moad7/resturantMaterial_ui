import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

const API_URL = 'http://127.0.0.1:3000/waiters/addNewWaiters';

function AddWaiterPage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        API_URL,
        { name },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(() => {
        alert('Waiter added successfully! ✅');
        navigate('/waiters');
      })
      .catch((err) => {
        console.error('Error adding waiter: ❌', err);
        alert('An error occurred while adding the waiter. ❌');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        minHeight: '25vh',
        marginTop: 20,
        px: 2,
      }}
    >
      <Card sx={{ p: 3, boxShadow: 3, width: '100%', maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom>
          Add a new waiter ➕
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Waiter's Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Add Waiter ➕'
            )}
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default AddWaiterPage;
