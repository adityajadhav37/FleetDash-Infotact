
const vehicleService = require('../services/vehicleService');

// GET all vehicles or filter by status
function getAllVehicles(req, res) {
  const { status } = req.query;
  let vehicles;

  if (status !== undefined) {
    const normalizedStatus = status.trim().toLowerCase();

    if (!['moving', 'idle'].includes(normalizedStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Use Moving or Idle.'
      });
    }

    vehicles = vehicleService.getVehiclesByStatus(normalizedStatus);
  } else {
    vehicles = vehicleService.getAllVehicles();
  }

  return res.status(200).json({
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
