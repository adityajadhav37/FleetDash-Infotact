
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health-check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FleetDash backend is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`FleetDash server running on http://localhost:${PORT}`);
});
