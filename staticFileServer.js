//Serves static files from public/ dir through 'express'

// Load "env" variables
require('dotenv').config();

const express = require('express');
const app = express();

// Use PORT from ".env"
const port = process.env.PORT;

// Serve static files from the "public" folder
app.use(express.static('public'));

// 404 handler
app.use((req, res) => {
  console.warn(`404 - Page not found: ${req.originalUrl}`);
  res.status(404).send(`OOPS! Page not found.`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});