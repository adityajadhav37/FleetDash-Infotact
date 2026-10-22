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

module.exports = {
  getAllVehicles
};