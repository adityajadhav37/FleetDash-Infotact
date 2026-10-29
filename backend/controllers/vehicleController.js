const vehicleService = require('../services/vehicleService');
const { validateVehicleTelemetry } = require('../services/telemetryValidator');

// GET all vehicles or filter by status
function getAllVehicles(req, res, next) {
  try {
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

    for (const vehicle of vehicles) {
      const validation = validateVehicleTelemetry(vehicle);

      if (!validation.valid) {
        const error = new Error('Vehicle telemetry validation failed.');
        error.statusCode = 500;
        throw error;
      }
    }

    return res.status(200).json({
      success: true,
      count: vehicles.length,
      lastUpdated: new Date().toISOString(),
      data: vehicles
    });
  } catch (error) {
    return next(error);
  }
}

// GET one vehicle by ID
function getVehicleById(req, res, next) {
  try {
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

    const validation = validateVehicleTelemetry(vehicle);

    if (!validation.valid) {
      const error = new Error('Vehicle telemetry validation failed.');
      error.statusCode = 500;
      throw error;
    }

    return res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllVehicles,
  getVehicleById
};