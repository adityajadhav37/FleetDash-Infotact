
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const vehicleRoutes = require('./routes/vehicleRoutes');
const vehicleService = require('./services/vehicleService');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

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

// Centralized error-handling middleware
app.use(errorHandler);

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Send initial vehicle data to the newly connected client
  socket.emit('vehicles:update', {
    success: true,
    lastUpdated: new Date().toISOString(),
    data: vehicleService.getAllVehicles()
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Broadcast updated telemetry to connected clients
vehicleService.setTelemetryUpdateHandler((vehicles) => {
  io.emit('vehicles:update', {
    success: true,
    lastUpdated: new Date().toISOString(),
    data: vehicles
  });
});

// Start HTTP and Socket.IO server
server.listen(PORT, () => {
  console.log(`FleetDash server running on http://localhost:${PORT}`);
  console.log('Socket.IO real-time telemetry is enabled');
});