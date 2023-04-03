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
    let taskStage = await getTaskStage(auth);
    let tasks = await getTasks(auth, taskStage);
    let users = await getUsers(auth);
    let employees = await getEmployees(users);
    let stage = await getStage(auth);
    let tagProject = await getTagProject(auth);
    let tagTask = await getTaskTags(auth);

    await clearData();
    await saveData(projects = projects, tasks = tasks, users = users, stage = stage, taskStage = taskStage, tagProject = tagProject, tagTask = tagTask);

    let result = {
      projects: projects.length,
      tasks: tasks.length,
      users: employees.length
    }
    logger.info("Result: " + JSON.stringify(result), { method: "updatedataService" });
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
  let endpoint = `${config.odoo_service}/project.project`;
  logger.info("endpoint ext: " + endpoint, { method: "getProjects" });
  let result = await axios.get(endpoint, { auth: auth });
  logger.info("response ext: " + JSON.stringify(result.data), { method: "getProjects" });
  return result.data;
};

const getTasks = async (auth, taskStage) => {
  let endpoint = `${config.odoo_service}/project.task`;
  logger.info("endpoint ext: " + endpoint, { method: "getTasks" });
  let result = await axios.get(endpoint, { auth: auth });
  logger.info("response ext: " + JSON.stringify(result.data), { method: "getTasks" });
  let tasks = result.data;
  taskStage.forEach(stage => {
    //let tasksFiltered = tasks.filter(e=>e.stage_id === stage.id);
    tasks.forEach(t => {
      if (t.stage_id === stage.id) {
        let stage_name = stage.name;
        let stage_color = 2;
        if (stage_name === 'Done') stage_color = 3;
        if (stage_name === 'New') stage_color = 1;
        t = Object.assign(t, { stage_name });
        t = Object.assign(t, { stage_color });
      }
    });
  });

  return tasks;
};

const getEmployees = async (users) => {
  logger.info(users, { method: "getEmployees" });
  let employees = users.filter((e) => e.employee_id);
  logger.info("response ext: " + JSON.stringify(employees), { method: "employees" });
  return employees;
};

const getUsers = async (auth) => {
  let endpoint = `${config.odoo_service}/res.users`;
  logger.info("endpoint ext: " + endpoint, { method: "getUsers" });
  let result = await axios.get(endpoint, { auth: auth });
  logger.info("response ext: " + JSON.stringify(result.data), { method: "getUsers" });
  return result.data;
};

const getTaskStage = async (auth) => {
  let endpoint = `${config.odoo_service}/project.task.type`;
  logger.info("endpoint ext: " + endpoint, { method: "getTaskStage" });
  let result = await axios.get(endpoint, { auth: auth });
  logger.info("response ext: " + JSON.stringify(result.data), { method: "getTaskStage" });
  taskStages = result.data.filter(e => e.project_ids.length > 0);
  return taskStages;
};

const getStage = async (auth) => {
  let endpoint = `${config.odoo_service}/project.project.stage`;
  logger.info("endpoint ext: " + endpoint, { method: "getStage" });
  let result = await axios.get(endpoint, { auth: auth });
  logger.info("response ext: " + JSON.stringify(result.data), { method: "getStage" });
  return result.data;
};

const getTagProject = async (auth) => {
  let endpoint = `${config.odoo_service}/project.tags`;
  logger.info("endpoint ext: " + endpoint, { method: "getTagProject" });
  let result = await axios.get(endpoint, { auth: auth });
  logger.info("response ext: " + JSON.stringify(result.data), { method: "getTagProject" });
  return result.data.filter(e => !e.name.includes('(task)'));
};

const getTaskTags = async (auth) => {
  let endpoint = `${config.odoo_service}/project.tags`;
  logger.info("endpoint ext: " + endpoint, { method: "getTaskTags" });
  let result = await axios.get(endpoint, { auth: auth });
  logger.info("response ext: " + JSON.stringify(result.data), { method: "getTaskTags" });
  //return result.data.filter(e=>e.name.includes('(task)') );
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
  await connection.clearData("stage");
  await connection.clearData("taskStage");
  await connection.clearData("tagProject");
  await connection.clearData("tagTask");
}

const saveData = async (projects=projects, tasks=tasks, users=users,stage=stage,taskStages=taskStages,tagProject=tagProject,tagTask=tagTask) => {
  await connection.saveMultiDocument("projects",projects);
  await connection.saveMultiDocument("tasks",tasks);
  await connection.saveMultiDocument("users",users);
  await connection.saveMultiDocument("stage",stage);
  await connection.saveMultiDocument("taskStage",taskStages);
  await connection.saveMultiDocument("tagProject",tagProject);
  await connection.saveMultiDocument("tagTask",tagTask);
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
