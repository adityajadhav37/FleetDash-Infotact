const REQUIRED_FIELDS = [
  'id',
  'name',
  'driver',
  'speed',
  'fuel',
  'temperature',
  'status',
  'latitude',
  'longitude'
];

// Validate one vehicle's telemetry data
function validateVehicleTelemetry(vehicle) {
  const errors = [];

  if (!vehicle || typeof vehicle !== 'object') {
    return {
      valid: false,
      errors: ['Vehicle data must be an object.']
    };
  }

  if (typeof vehicle.id !== 'string' || !/^VH-\d{3}$/.test(vehicle.id)) {
    errors.push('Vehicle ID must follow the format VH-001.');
  }

  for (const field of REQUIRED_FIELDS) {
    if (vehicle[field] === undefined || vehicle[field] === null) {
      errors.push(`Missing required field: ${field}.`);
    }
  }

  const numericRanges = {
    speed: [0, 100],
    fuel: [0, 100],
    temperature: [65, 110],
    latitude: [-90, 90],
    longitude: [-180, 180]
  };

  for (const [field, [min, max]] of Object.entries(numericRanges)) {
    const value = vehicle[field];

    if (typeof value !== 'number' || !Number.isFinite(value)) {
      errors.push(`${field} must be a finite number.`);
    } else if (value < min || value > max) {
      errors.push(`${field} must be between ${min} and ${max}.`);
    }
  }

  if (!['Moving', 'Idle'].includes(vehicle.status)) {
    errors.push('Status must be Moving or Idle.');
  }

  for (const field of ['name', 'driver']) {
    if (typeof vehicle[field] !== 'string' || !vehicle[field].trim()) {
      errors.push(`${field} must be a non-empty string.`);
    }
  }

  if (vehicle.status === 'Idle' && vehicle.speed !== 0) {
    errors.push('An idle vehicle must have a speed of 0.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateVehicleTelemetry
};