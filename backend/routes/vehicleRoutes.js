
const express = require('express');

const router = express.Router();

// Initial vehicle telemetry data
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

// Generate a small random change
function randomChange(min, max) {
  return Math.random() * (max - min) + min;
}

// Simulate updated telemetry every 3 seconds
setInterval(() => {
  vehicles.forEach((vehicle) => {
    // Update speed and movement status
    if (Math.random() < 0.05) {
      vehicle.status =
        vehicle.status === 'Moving' ? 'Idle' : 'Moving';
    }

    if (vehicle.status === 'Moving') {
      vehicle.speed = Math.max(
        20,
        Math.min(100, Math.round(
          vehicle.speed + randomChange(-8, 8)
        ))
      );

      // Simulate small location changes while moving
      vehicle.latitude = Number(
        (vehicle.latitude + randomChange(-0.0005, 0.0005)).toFixed(6)
      );

      vehicle.longitude = Number(
        (vehicle.longitude + randomChange(-0.0005, 0.0005)).toFixed(6)
      );
    } else {
      vehicle.speed = 0;
    }

    // Fuel decreases slowly while the vehicle is moving
    if (vehicle.status === 'Moving' && vehicle.fuel > 0) {
      vehicle.fuel = Number(
        Math.max(0, vehicle.fuel - randomChange(0, 0.05)).toFixed(2)
      );
    }

    // Simulate engine temperature changes
    vehicle.temperature = Math.max(
      65,
      Math.min(
        110,
        Math.round(vehicle.temperature + randomChange(-2, 2))
      )
    );
  });
}, 3000);

// GET all vehicles
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: vehicles.length,
    lastUpdated: new Date().toISOString(),
    data: vehicles
  });
});

module.exports = router;
