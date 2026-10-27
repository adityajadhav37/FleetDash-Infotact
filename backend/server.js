
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Vehicle telemetry API
app.use('/api/vehicles', vehicleRoutes);

// Health-check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FleetDash backend is running',
    timestamp: new Date().toISOString()
  });
});

// Handle unknown API routes
app.use('/api', (req, res) => {
  return res.status(404).json({
    success: false,
    message: `API route '${req.originalUrl}' was not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`FleetDash server running on http://localhost:${PORT}`);
});
