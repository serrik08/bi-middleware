//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { loginService } = require("./loginService");
const { projectsService, getprojectsService } = require("./projectsService");
const { updatedataService } = require("./updateDataService")

exports.login = async (req, res) => {
  return await loginService(req, res);
};

exports.updatedata = async (req, res) => {
  return await updatedataService(req, res);
};

exports.getprojects = async (req, res) => {
  return await getprojectsService(req, res);
};

exports.projects = async (req, res) => {
  return await projectsService(req, res);
};
