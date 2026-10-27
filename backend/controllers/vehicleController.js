
const vehicleService = require('../services/vehicleService');

// GET all vehicles or filter by status
function getAllVehicles(req, res) {
  const allowedQueryParams = ['status'];
  const unexpectedParams = Object.keys(req.query).filter(
    (key) => !allowedQueryParams.includes(key)
  );

  if (unexpectedParams.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Unsupported query parameter: ${unexpectedParams[0]}`
    });
  }

  const { status } = req.query;
  let vehicles;

  if (status !== undefined) {
    if (typeof status !== 'string' || !status.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Status must be Moving or Idle.'
      });
    }

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
  const id = req.params.id;

  if (!/^VH-\d{3}$/i.test(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid vehicle ID format. Use an ID such as VH-001.'
    });
  }

  const vehicle = vehicleService.getVehicleById(id);

  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: `Vehicle with ID '${id}' was not found`
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
