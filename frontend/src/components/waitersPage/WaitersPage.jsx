import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';

const url = 'http://127.0.0.1:3000/waiters';

function WaitersPage() {
  const [waiters, setWaiters] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => setWaiters(response.data))
      .catch((err) => console.error('Error fetching waiters:', err))
      .finally(() => setLoading(false));
  }, []);

  const deleteWaiter = (id) => {
    if (!window.confirm('Are you sure you want to delete this waiter?')) return;

    axios
      .delete(`${url}/deleteWaitersById/${id}`)
      .then(() => setWaiters(waiters.filter((w) => w.idWaiters !== id)))
      .catch((err) => console.error('Error deleting waiter:', err));
  };

  return (
    <Box sx={{ backgroundColor: '#f4f7fc', minHeight: '100vh', py: 4 }}>
      <Card sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <CardContent>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
              Waiters List
            </Typography>
            <Link to="/waiters/new">
              <Button variant="contained" color="success">
                Add New Waiter
              </Button>
            </Link>
          </div>

          {/* Loading Indicator */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer
              component={Paper}
              sx={{ maxHeight: '400px', boxShadow: 3 }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="waiters table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {waiters.length > 0 ? (
                    waiters.map((waiter, index) => (
                      <TableRow key={waiter.idWaiters}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{waiter.name}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() => deleteWaiter(waiter.idWaiters)}
                          >
                            🗑 Delete
                          </Button>
                          <Button
                            variant="outlined"
                            color="info"
                            size="small"
                            onClick={() => {
                              navigate(`/waiters/update/${waiter.idWaiters}`, {
                                state: { waiterItem: waiter },
                              });
                            }}
                          >
                            ✏️ Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="3" align="center">
                        No waiters found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default WaitersPage;
