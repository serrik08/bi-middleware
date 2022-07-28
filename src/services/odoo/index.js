//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { loginService } = require("./loginService");
const { projectsService, getprojectsService } = require("./projectsService");
const { getEmployeesService } = require("./employeeService");
const { updatedataService } = require("./updateDataService");
const { getKpiErpService } = require("./kpiService")
const {
  projectsPerDateService,
  percentOfTagsService,
  tasksPerEmployee,
  costPerDate,
} = require("./chartsService");

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

exports.chartProjectsPerDate = async (req, res) => {
  return await projectsPerDateService(req, res);
};

exports.chartPercentOfTags = async (req, res) => {
  return await percentOfTagsService(req, res);
};

exports.chartTasksPerEmployee = async (req, res) => {
  return await tasksPerEmployee(req, res);
};

exports.chartCostPerDate = async (req, res) => {
  return await costPerDate(req, res);
};

exports.getEmployees = async (req, res) => {
  return await getEmployeesService(req, res);
};

exports.getKpiErp = async (req, res) => {
  return await getKpiErpService(req, res);
};
