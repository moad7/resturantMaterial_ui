import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import OrdersPage from './components/orderPage/OrderPage';
// import OrderDetailsPage from './components/orderPage/OrderDetailsPage';
import AddOrderPage from './components/orderPage/AddOrderPage';
import DishesPage from './components/dishesPage/DishesPage';
import AddDishPage from './components/dishesPage/AddDishPage';
import AddWaiterPage from './components/waitersPage/AddWaiterPage';
import WaitersPage from './components/waitersPage/WaitersPage';
import UpdateWaiterPage from './components/waitersPage/UpdateWaiterPage';
import OrderDetailsPage from './components/orderPage/OrderDetailsPage';
import UpdateDishe from './components/dishesPage/UpdateDishe';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/new" element={<AddOrderPage />} />
          <Route path="/orders/details/:id" element={<OrderDetailsPage />} />

          <Route path="/dishes" element={<DishesPage />} />
          <Route path="/dishes/new" element={<AddDishPage />} />
          <Route path="/dishes/update/:id" element={<UpdateDishe />} />
          <Route path="/waiters" element={<WaitersPage />} />
          <Route path="/waiters/new" element={<AddWaiterPage />} />
          <Route path="/waiters/update/:id" element={<UpdateWaiterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
