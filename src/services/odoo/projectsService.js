const errorConstants = require("../../util/errorConstants");
const axios = require("axios");
const config = require("../../util/config");
const logger = require("../../util/logger");
const connection = require("../../dataAccess/mongoConnection");

const projectsService = async (req, res) => {
  logger.info("begin", { method: "projectsServiceOdoo" });
  logger.info("body service: " + JSON.stringify(req.body), {
    method: "projectsServiceOdoo",
  });
  try {
    await validateFields(req.body);
    let endpointLogin = `${config.odoo_service}/project.project`;
    logger.info("endpoint ext: " + endpointLogin, {
      method: "projectsServiceOdoo",
    });
    let auth = {
      username: req.body.userOdoo, password: req.body.tokenOdoo,
    };
    let resultService = await axios.get(endpointLogin, {auth: auth});
    logger.info("response ext: " + JSON.stringify(resultService.data), {
      method: "projectsServiceOdoo",
    });
    let projectsIds = await connection.getDocumentsIds("projects");
    let filteredResult = resultService.data.filter(
      (res) => !projectsIds.includes(res.id)
    );
    let result;
    if (filteredResult.length === 0)
      result = {
        errCode: "",
        errMsg: "",
        data: {
          success: false,
          description: "no data saved",
        },
      };
    else
      result = await connection.saveMultiDocument("projects", filteredResult);
    logger.info("response service: " + JSON.stringify(result), {
      method: "projectsServiceOdoo",
    });
    logger.info("end", { method: "projectsServiceOdoo" });
    return result;
  } catch (error) {
    let res_error = {
      errCode: errorConstants.codeError,
      errMsg: error.message,
      data: [],
    };
    logger.error(JSON.stringify(res_error), { method: "projectsServiceOdoo" });
    return res_error;
  }
};

const getprojectsService = async (req, res) => {
  logger.info("begin", { method: "getprojectsService" });
  logger.info("body service: " + JSON.stringify(req.body), {
    method: "getprojectsService",
  });
  let result;
  try {
    let projects = await connection.getDocuments("projects");

    result = await addStagesToProject(projects);
    result = await addEmployeeToProject(projects);
    result = formatDateOnProject(projects);
    result = await addTagsToProject(projects);
    result = await addTasksToProject(projects);
    result = getRemainingTimePercent(projects);
    result = getColorDateAndCost(projects);

    logger.info("Result: " + JSON.stringify(result), {
      method: "getprojectsService",
    });
    logger.info("end", { method: "getprojectsService" });
    return result;
  } catch (error) {
    let res_error = {
      errCode: errorConstants.codeError,
      errMsg: error.message,
    };
    logger.error(JSON.stringify(res_error), { method: "getprojectsService" });
    return res_error;
  }
};
const getColorDateAndCost = (projects) => {
  let colorDateFinish,colorCost;
  projects.forEach(p => {
    if (new Date(p.bi_real_date_finish) > new Date(p.date)){
      colorDateFinish=1;
    }else colorDateFinish=3;
    if (p.bi_cost_final > p.bi_cost_planning) colorCost=1;
    else colorCost=3;
    let objdatecolor = {
      colorDateFinish: colorDateFinish,
      colorCost:colorCost
    }
    p = Object.assign(p, objdatecolor);
  })
  return projects;
}

const getRemainingTimePercent = (projects) => {
  let percent,color_remaining_hours;
  projects.forEach(p => {
    percent = ((p.remaining_hours * 100 ) / (p.total_timesheet_time+p.remaining_hours));
    if (percent>0) {
      percent = 100 - percent;
      color_remaining_hours = 3;
    } else color_remaining_hours = 1;
    percent = parseInt(percent);
    let objPercent = { 
      percent_remaining_hours: (percent>0)? percent:percent*-1,
      color_remaining_hours: color_remaining_hours
    }
    p = Object.assign(p, objPercent);
  })
  return projects;
}

const addStagesToProject = async (projects) => {
  let stages = await connection.getDocuments("stage");
  projects.forEach((element) => {
    stage_name = {
      stage_name: stages.find((o) => o.id === element.stage_id).name,
    };
    element = Object.assign(element, stage_name);
  });
  return projects;
};

const addEmployeeToProject = async (projects) => {
  let employees = await connection.getDocuments("users");
  projects.forEach((element) => {
    employee = { employee: employees.find((o) => o.id === element.user_id) };
    element = Object.assign(element, employee);
  });
  return projects;
};

const addTagsToProject = async (projects) => {
  let tagsList = await connection.getDocuments("tagProject");
  projects.forEach((element) => {
    let tags = [];
    element.tag_ids.forEach((tag_id) => {
      tags.push(tagsList.find((o) => o.id === tag_id));
    });
    element = Object.assign(element, { tags });
  });
  return projects;
};

const addTasksToProject = async (projects) => {
  let tasksList = await connection.getDocuments("tasks");
  projects.forEach((element) => {
    let tasks_ids = [];
    element.tasks.forEach((task_id) => {
      tasks_ids.push(tasksList.find((o) => o.id === task_id));
    });
    element = Object.assign(element, { tasks_ids });
  });
  return projects;
};

const formatDateOnProject = (projects) => {
  projects.forEach((element) => {
    if (element.date !== undefined && element.date !== "")
      element.date = element.date.substring(0, 10);
    if (element.date_start !== undefined && element.date_start !== "")
      element.date_start = element.date_start.substring(0, 10);
    if (element.bi_real_date_finish !== undefined && element.bi_real_date_finish !== "")
      element.bi_real_date_finish = element.bi_real_date_finish.substring(0, 10);
  });
  return projects;
};

const validateFields = (body) => {
  if (body.userOdoo === undefined || body.tokenOdoo === undefined)
    throw new Error("NO DATA| Campo usuario o token no definido");
  if (body.userOdoo === "" || body.tokenOdoo === "")
    throw new Error("NO DATA| Campo usuario y token son obligatorios");
};

module.exports = {
  projectsService: projectsService,
  getprojectsService: getprojectsService,
};
