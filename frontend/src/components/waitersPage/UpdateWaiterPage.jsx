import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';

const API_URL = 'http://127.0.0.1:3000/waiters';

function UpdateWaiterPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const waiterItem = location.state.waiterItem || null;

  const [name, setName] = useState(waiterItem?.name || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (waiterItem) {
      setName(waiterItem.name);
    }
  }, [waiterItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`${API_URL}/updateWaitersById/${id}`, { name })
      .then(() => {
        alert('Waiter updated successfully! ✅');
        navigate('/waiters');
      })
      .catch((err) => console.error('❌ Error updating waiter:', err))
      .finally(() => setLoading(false));
  };

  return (
    <Box sx={{ backgroundColor: '#f4f7fc', minHeight: '100vh', py: 4 }}>
      <Card sx={{ maxWidth: 600, margin: '0 auto', boxShadow: 3 }}>
        <CardContent>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/waiters')}
            sx={{ mb: 2 }}
          >
            🔙 Back to waiters list
          </Button>

          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: 600, mb: 3 }}
          >
            Edit Waiter Data 👨‍🍳
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Waiter's Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Save Changes 💾'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UpdateWaiterPage;
