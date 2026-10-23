
const vehicleService = require('../services/vehicleService');

// GET all vehicles
function getAllVehicles(req, res) {
  const vehicles = vehicleService.getAllVehicles();

  res.status(200).json({
    success: true,
    count: vehicles.length,
    lastUpdated: new Date().toISOString(),
    data: vehicles
  });
}

// GET one vehicle by ID
function getVehicleById(req, res) {
  const vehicle = vehicleService.getVehicleById(req.params.id);

  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: `Vehicle with ID '${req.params.id}' was not found`
    });
  }

  return res.status(200).json({
    success: true,
    data: vehicle
  });
}

module.exports = {
  getAllVehicles,
  getVehicleById
};
