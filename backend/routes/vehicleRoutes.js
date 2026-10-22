const express = require('express');
const vehicleController = require('../controllers/vehicleController');

const router = express.Router();

// GET all vehicles
router.get('/', vehicleController.getAllVehicles);

module.exports = router;