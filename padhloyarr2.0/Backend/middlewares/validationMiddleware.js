const { validationResult } = require('express-validator');
const responseFormatter = require('../utils/responseFormatter');

const validateRequest = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return responseFormatter.error(res, 400, 'Validation failed', errors.array());
  };
};

module.exports = {
  validateRequest
};