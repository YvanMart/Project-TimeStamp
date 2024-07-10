const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route handler for /api/:date?
app.get('/api/:date?', (req, res) => {
  let inputDate = req.params.date || new Date(); // If no date provided, default to current time

  // Check if inputDate is a valid Unix timestamp
  if (/^\d+$/.test(inputDate)) {
    inputDate = parseInt(inputDate);
  }

  inputDate = new Date(inputDate); // Attempt to parse as a date

  // Check if inputDate is invalid
  if (isNaN(inputDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Format the output
  const unix = inputDate.getTime();
  const utc = inputDate.toUTCString();

  // Send the response
  res.json({ unix, utc });
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});