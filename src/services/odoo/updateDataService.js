const errorConstants = require("../../util/errorConstants");
const axios = require("axios");
const config = require("../../util/config");
const logger = require("../../util/logger");
const connection = require("../../dataAccess/mongoConnection");

const updatedataService = async (req, res) => {
  logger.info("begin", { method: "updatedataService" });
  logger.info("body service: " + JSON.stringify(req.body), {
    method: "updatedataService",
  });
  try {
    await validateFields(req.body);
    let auth = getAuth(req.body);

    let projects = await getProjects(auth);
    let tasks = await getTasks(auth);
    let users = await getUsers(auth);

    await clearData();
    await saveData(projects ,tasks ,users);

    let result = {
      projects: projects.length,
      tasks: tasks.length,
      users: users.length
    }
    logger.info("Result: "+JSON.stringify(result), { method: "updatedataService" });
    logger.info("end", { method: "updatedataService" });
    return result;
  } catch (error) {
    let res_error = {
      errCode: errorConstants.codeError,
      errMsg: error.message
    };
    logger.error(JSON.stringify(res_error), { method: "updatedataService" });
    return res_error;
  }
};

const getProjects = async (auth) => {
  let endpointLogin = `${config.odoo_service}/api/v1/demo/project.project`;
  logger.info("endpoint ext: " + endpointLogin, { method: "getProjects" });
  result = await axios.get(endpointLogin, { auth: auth });
  logger.info("response ext: " + JSON.stringify(result.data), { method: "getProjects" });
  return result.data;
};

const getTasks = async (auth) => {
  let endpointLogin = `${config.odoo_service}/api/v1/demo/project.task`;
  logger.info("endpoint ext: " + endpointLogin, { method: "getTasks" });
  result = await axios.get(endpointLogin, { auth: auth });
  logger.info("response ext: " + JSON.stringify(result.data), { method: "getTasks" });
  return result.data;
};

const getUsers = async (auth) => {
  let endpointLogin = `${config.odoo_service}/api/v1/demo/res.users`;
  logger.info("endpoint ext: " + endpointLogin, { method: "getUsers" });
  result = await axios.get(endpointLogin, { auth: auth });
  logger.info("response ext: " + JSON.stringify(result.data), { method: "getUsers" });
  return result.data;
};

const getAuth = (body) => {
  return {
    username: body.userOdoo,
    password: body.tokenOdoo,
  };
};

const clearData = async () => {
  await connection.clearData("projects");
  await connection.clearData("tasks");
  await connection.clearData("users");
}

const saveData = async (projects, tasks, users) => {
  await connection.saveMultiDocument("projects",projects);
  await connection.saveMultiDocument("tasks",tasks);
  await connection.saveMultiDocument("users",users);
}

const validateFields = (body) => {
  if (body.userOdoo === undefined || body.tokenOdoo === undefined)
    throw new Error("NO DATA| Campo usuario o token no definido");
  if (body.userOdoo === "" || body.tokenOdoo === "")
    throw new Error("NO DATA| Campo usuario y token son obligatorios");
};

module.exports = {
  updatedataService: updatedataService,
};
