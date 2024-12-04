import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import Payments from './components/Payments';
import Transactions from './components/Transactions';
import Register from './components/Register';
import Login from './components/Login';
import './Home.css'; // Import your CSS file

const Welcome = () => {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Define the navigate variable here

  // Update the function to accept the name when logging in or registering
  const handleLogin = (name) => {
    setUserName(name);
    setIsLoggedIn(true); // Set user as logged in
    navigate('/payments'); // Navigate after successful login
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {!isLoggedIn ? (
          <>
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </>
        ) : (
          <>
            <Route path="/payments" element={<Payments />} />
            <Route path="/transactions" element={<Transactions />} />
          </>
        )}
      </Routes>

      {/* Greeting message when the user is logged in */}
      {isLoggedIn && (
        <div className="app-container">
          <div className="content-block">
            <div className="welcome-message">
              <h2>Welcome, {userName}!</h2>
              <p>Would you like to make a payment or view your transaction history?</p>
              <div className="button-container">
                <button onClick={() => navigate('/payments')} className="nav-button">Payments</button>
                <button onClick={() => navigate('/transactions')} className="nav-button">View Transactions</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Welcome;
