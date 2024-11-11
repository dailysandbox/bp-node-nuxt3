const express = require('express');
const app = express();
const port = 3000;

// Basic API route
app.get('/', (req, res) => {
  res.send('Welcome to the Server Node API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Node API is running on http://localhost:${port}`);
});
