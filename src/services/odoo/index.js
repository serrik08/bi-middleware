//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const errorConstants = require("../../util/errorConstants");
const config = require("../../util/config");
const axios = require("axios");

const { loginService } = require("./loginService");

const {
  validateFieldsProjects,
  prepareRequestProjects,
  prepareResponseProjects,
} = require("./projectsService");

exports.login = async (req, res) => {
  return await loginService(req, res);
};

exports.projects = async (req, res) => {
  try {
    validateFieldsProjects(req.body);
    let parameters = prepareRequestProjects(req.body);
    let resultService = await axios.post(
      `${config.odoo_service}/jsonrpc`,
      parameters
    );
    let result = prepareResponseProjects(resultService);
    return result;
  } catch (error) {
    return {
      errCode: errorConstants.codeError,
      errMsg: error.message,
      data: [],
    };
  }
};

exports.typefinds = async (req, res) => {
  try {
    const result = await axios.post(
      `${config.tigo_molbile_service}/v1/search`,
      req.body
    );
    return result.data;
  } catch (error) {
    return {
      errCode: errorConstants.codeError,
      errMsg: error.message,
      data: [],
    };
  }
};
