const errorConstants = require("../../util/errorConstants");
const axios = require("axios");
const config = require("../../util/config");
const logger = require("../../util/logger");
const connection = require("../../dataAccess/mongoConnection");

const getEmployeesService = async (req, res) => {
  logger.info("begin", { method: "getEmployeesService" });
  logger.info("body service: " + JSON.stringify(req.body), {
    method: "getEmployeesService",
  });
  let result;
  try {
    let users = await connection.getDocuments("users");

    result = await addProjects(users);
    result = await addStagesToProject(users);

    logger.info("Result: " + JSON.stringify(users), {
      method: "getEmployeesService",
    });
    logger.info("end", { method: "getEmployeesService" });
    return users;
  } catch (error) {
    let res_error = {
      errCode: errorConstants.codeError,
      errMsg: error.message,
    };
    logger.error(JSON.stringify(res_error), { method: "getEmployeesService" });
    return res_error;
  }
};
const addProjects = async (users) => {
  let projects = await connection.getDocuments("projects");
  let objProject;
  users.forEach((user) => {
    let projectsFiltered = projects.filter((o) => o.user_id === user.id);
    projectsFiltered.forEach((p) => {
      p.bi_real_date_finish = p.bi_real_date_finish.substring(0, 10);
    });
    objProject = {
      projects: projectsFiltered,
    };
    user = Object.assign(user, objProject);
  });
  console.log(users);
  return users;
};

const addStagesToProject = async (users) => {
  let stages = await connection.getDocuments("stage");
  users.forEach((user) => {
    user.projects.forEach((element) => {
      stage_name = {
        stage_name: stages.find((o) => o.id === element.stage_id).name,
      };
      element = Object.assign(element, stage_name);
    });
  });
  return users;
};

module.exports = {
  getEmployeesService: getEmployeesService,
};
