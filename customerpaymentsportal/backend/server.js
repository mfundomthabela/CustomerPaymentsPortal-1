// Import required modules
const express = require('express');
const app = express();
const http = require('http');

// Middleware and other app configurations (routes, body parsers, etc.)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes (you can add more routes as needed)
app.get('/', (req, res) => {
  res.send('Welcome to the Customer Payments Portal');
});

// Create an HTTP server to run the application on port 3000
http.createServer(app).listen(3000, () => {
  console.log('Server is running on HTTP port 3000');
});
