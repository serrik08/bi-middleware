const { response } = require('express');
const errorConstants = require('../util/errorConstants');

const validateConectionMongo = async (req, res = response, next) => {
  const valid = ajv.validate(schemaSearch, req.body)
  if (valid) {
    next();
  } else {
    result = {
      errCode: errorConstants.codeValidationError,
      errMsg: filterMessageError(ajv),
      data: []
    };
    return res.send(result);
  }
};

module.exports = {
  validateConectionMongo
};