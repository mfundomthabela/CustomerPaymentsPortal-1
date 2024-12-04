// src/Register.js
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import '../styles.css';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Regex for email validation
  const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name); // Allows only letters and spaces

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValidName(name) || !isValidEmail(email)) {
      alert('Invalid input');
      return;
    }

    // userData object with the required fields
    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData, {
        withCredentials: true, // Ensure this is set
      });

      console.log('User registered:', response.data);
      onRegister(name); // Call the onRegister function with the user's name
      navigate('/'); // Navigate to the main app page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      // Show user feedback based on error response
      if (error.response && error.response.data.errors) {
        alert(error.response.data.errors.map(err => err.msg).join(', '));
      } else {
        alert('Registration failed. Please try again.'); // User feedback
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-content-block">
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
