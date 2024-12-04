import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome'; // Import the Welcome component
import Register from './components/Register'; 
import Login from './components/Login'; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* You can add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
