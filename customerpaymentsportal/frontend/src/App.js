import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Payments from './components/Payments';
import Transactions from './components/Transactions';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
};

export default App;
