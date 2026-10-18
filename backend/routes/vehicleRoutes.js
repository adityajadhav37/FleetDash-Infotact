
const express = require('express');

const router = express.Router();

// Temporary vehicle telemetry data
const vehicles = [
  {
    id: 'VH-001',
    name: 'Truck 01',
    driver: 'Rahul Sharma',
    speed: 65,
    fuel: 78,
    temperature: 82,
    status: 'Moving',
    latitude: 18.5204,
    longitude: 73.8567
  },
  {
    id: 'VH-002',
    name: 'Truck 02',
    driver: 'Amit Patil',
    speed: 0,
    fuel: 45,
    temperature: 76,
    status: 'Idle',
    latitude: 18.6298,
    longitude: 73.7997
  },
  {
    id: 'VH-003',
    name: 'Truck 03',
    driver: 'Sneha Joshi',
    speed: 72,
    fuel: 22,
    temperature: 95,
    status: 'Moving',
    latitude: 18.4575,
    longitude: 73.8508
  }
];

// GET all vehicles
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: vehicles.length,
    data: vehicles
  });
});

module.exports = router;
