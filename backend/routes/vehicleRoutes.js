
const express = require('express');
const vehicleController = require('../controllers/vehicleController');

const router = express.Router();

// GET all vehicles
router.get('/', vehicleController.getAllVehicles);

// GET one vehicle by ID
router.get('/:id', vehicleController.getVehicleById);

module.exports = router;
