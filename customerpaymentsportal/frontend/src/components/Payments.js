import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles.css'; // Make sure to import your CSS file

const Payments = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [currency, setCurrency] = useState('ZAR'); // Default currency is South African Rand (ZAR)
  const navigate = useNavigate(); // Initialize navigate for routing

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTransaction = {
      id: Date.now(), // Generate a unique ID based on the current timestamp
      amount,
      currency,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    };

    if (onSubmit) {
      // Call the provided onSubmit function
      onSubmit(newTransaction);
    } else {
      // Default handler if onSubmit is not provided
      console.log("Transaction submitted:", newTransaction);
    }

    // Reset form fields
    setAmount('');
    setPaymentMethod('credit-card');
    setCurrency('ZAR');
    
    alert("Payment submitted!");
  };

  return (
    <div className="payments-container">
      <div className="payments-content-block">
        <h2>Make a Payment</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Amount:</label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Currency:</label>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)} 
              required
            >
              <option value="ZAR">South African Rand (R)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
          <div>
            <label>Payment Method:</label>
            <select 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              required
            >
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <button type="submit">Submit Payment</button>
        </form>

        {/* Back to Home Button */}
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
};

export default Payments;