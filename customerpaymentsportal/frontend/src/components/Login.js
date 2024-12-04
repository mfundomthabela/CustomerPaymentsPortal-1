// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Make sure to import your CSS file

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Correctly used inside the component

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Regex for email validation

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      alert('Invalid email format');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      console.log('User logged in:', response.data);
      onLogin(response.data.username); // Use the prop to update state in App
      navigate('/payments'); // Navigate after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials and try again.'); // User feedback
    }
  };

  return (
    <div className="login-container">
      <div className="login-content-block">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
