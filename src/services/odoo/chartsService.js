const errorConstants = require("../../util/errorConstants");
const axios = require("axios");
const config = require("../../util/config");
const logger = require("../../util/logger");
const connection = require("../../dataAccess/mongoConnection");

const projectsPerDateService = async (req, res) => {
  logger.info("begin", { method: "projectsPerDateService" });
  logger.info("body service: " + JSON.stringify(req.body), {
    method: "projectsPerDateService",
  });
  let result;
  try {
    let projects = await connection.getDocuments("projects");
    let arrDateProjects = getDateProjects(projects);
    logger.info("getDateProjects: " + JSON.stringify(arrDateProjects), {
      method: "projectsPerDateService",
    });
    let data = countDateProjects(arrDateProjects);
    logger.info("end", { method: "projectsPerDateService" });
    return { type: "line", labels: [], label: "Proyectos", data: data };
  } catch (error) {
    let res_error = {
      errCode: errorConstants.codeError,
      errMsg: error.message,
    };
    logger.error(JSON.stringify(res_error), {
      method: "projectsPerDateService",
    });
    return res_error;
  }
};

const countDateProjects = (arrDateProjects) => {
  let countDate = 1;
  let date = "";
  let arrDate = [];
  arrDateProjects.forEach((element) => {
    if (element === date) {
      countDate += 1;
    } else {
      if (date !== "") {
        arrDate.push({ x: date, y: countDate });
        countDate = 1;
        date = element;
      } else date = element;
    }
  });
  arrDate.push({ x: date, y: countDate });
  return arrDate;
};

const getDateProjects = (projects) => {
  let arrDate = [];
  projects.forEach((element) => {
    if (
      element.bi_real_date_finish !== undefined &&
      element.bi_real_date_finish !== ""
    )
      arrDate.push(element.bi_real_date_finish.substring(0, 7));
  });
  arrDate = [...arrDate].sort();
  return arrDate;
};

const getDateTasks = (task) => {
  let arrDate = [];
  task.forEach((element) => {
    if (element.date_deadline !== undefined && element.date_deadline !== "")
      arrDate.push(element.date_deadline.substring(0, 7));
  });
  arrDate = [...arrDate].sort();
  return arrDate;
};
const percentOfTagsService = async (req, res) => {
  logger.info("begin", { method: "percentOfTagsService" });
  logger.info("body service: " + JSON.stringify(req.body), {
    method: "percentOfTagsService",
  });
  let result;
  try {
    let projects = await connection.getDocuments("projects");
    let tags = await connection.getDocuments("tag");
    let arrTags = getArrTags(projects);
    let arrCountTags = getNumberOfTags((tags = tags), (arrTags = arrTags));
    let labesTag = getLabelTags(tags);
    logger.info("getDateProjects: " + JSON.stringify(tags), {
      method: "percentOfTagsService",
    });
    logger.info("end", { method: "percentOfTagsService" });
    result = {
      type: "pie",
      labels: labesTag,
      label: "",
      data: arrCountTags,
    };
    return result;
  } catch (error) {
    let res_error = {
      errCode: errorConstants.codeError,
      errMsg: error.message,
    };
    logger.error(JSON.stringify(res_error), {
      method: "percentOfTagsService",
    });
    return res_error;
  }
};
const getArrTags = (projects) => {
  let arrTags = [];
  projects.forEach((element) => {
    if (element.tag_ids.length !== 0) {
      element.tag_ids.forEach((tag) => {
        arrTags.push(tag);
      });
    }
  });
  arrTags = [...arrTags].sort();
  return arrTags;
};
const getNumberOfTags = (tags = tags, arrTags = arrTags) => {
  let arrCountTags = [];
  let counter;
  tags.forEach((element) => {
    counter = arrTags.filter((e) => e === element.id).length;
    arrCountTags.push(counter);
    counter = 0;
  });
  return arrCountTags;
};
const getLabelTags = (tags) => {
  let arrLabels = [];
  tags.forEach((element) => {
    arrLabels.push(element.name);
  });
  return arrLabels;
};
const arrWithoutDuplicates = (arr) => {
  let newArr = [...new Set(arr)];
  return newArr;
};

const getTasksPerEmployees = (employess, arrDateProjects, tasks) => {
  // res = [{label:employe1,data:[2,3,3]},{label:employe2,data:[2,3,3]},...]
  let tasksTemp;
  let userInTask = [];
  let counter;
  let objTask;
  let result = [];
  employess.forEach((employee) => {
    let counterList = [];
    arrDateProjects.forEach((date) => {
      counter = 0;
      tasksTemp = tasks.filter((e) => e.date_deadline.substring(0, 7) === date);
      tasksTemp.forEach((e) => {
        e.user_ids.forEach((user) => {
          userInTask.push(user);
        });
      });
      userInTask.sort();
      counter = userInTask.filter((u) => u === employee.id).length;
      counterList.push(counter);
    });
    objTask = { label: employee.name, data: counterList};
    result.push(objTask);
  });
  return result;
};

const tasksPerEmployee = async (req, res) => {
  logger.info("begin", { method: "tasksPerEmployee" });
  logger.info("body service: " + JSON.stringify(req.body), {
    method: "tasksPerEmployee",
  });
  try {
    let employess = await connection.getDocuments("users");
    let tasks = await connection.getDocuments("tasks");
    let arrDateProjects = getDateTasks(tasks);
    arrDateProjects = arrWithoutDuplicates(arrDateProjects);
    let dataTask = getTasksPerEmployees(employess, arrDateProjects, tasks);
    logger.info("end", { method: "tasksPerEmployee" });
    return {
      type: "bar",
      labels: arrDateProjects,
      data: dataTask,
    };
  } catch (error) {
    let res_error = {
      errCode: errorConstants.codeError,
      errMsg: error.message,
    };
    logger.error(JSON.stringify(res_error), {
      method: "tasksPerEmployee",
    });
    return res_error;
  }
};

const getCostPlanning = (projects, arrDateProjects) => {
  projectTemp = [];
  let dataCost=[];
  arrDateProjects.forEach( date => {
    let costCount = 0;
    projectsTemp = projects.filter( project => project.bi_real_date_finish.substring(0, 7) === date );
    projectsTemp.forEach( project => {
      costCount += project.bi_cost_planning;
    });
    dataCost.push(costCount);
  });
  return {label: "Costo planificado", data:dataCost}
}
const getCostReal = (projects, arrDateProjects) => {
  projectTemp = [];
  let dataCost=[];
  arrDateProjects.forEach( date => {
    let costCount = 0;
    projectsTemp = projects.filter( project => project.bi_real_date_finish.substring(0, 7) === date );
    projectsTemp.forEach( project => {
      costCount += project.bi_cost_final;
    });
    dataCost.push(costCount);
  });
  return {label: "Costo real", data:dataCost}
}

const getCostPerProjects = (projects, arrDateProjects) => {
  let costPlanning = getCostPlanning(projects, arrDateProjects);
  let costReal = getCostReal(projects, arrDateProjects);
  return [costPlanning,costReal];
}

const costPerDate = async (req, res) => {
  logger.info("begin", { method: "tasksPerEmployee" });
  logger.info("body service: " + JSON.stringify(req.body), {
    method: "tasksPerEmployee",
  });
  try {
    let projects = await connection.getDocuments("projects");
    let arrDateProjects = getDateProjects(projects);
    arrDateProjects = arrWithoutDuplicates(arrDateProjects);
    let dataCost = getCostPerProjects(projects, arrDateProjects);
    logger.info("end", { method: "tasksPerEmployee" });
    return res = {
      "type": "line",
      "labels": arrDateProjects,
      "data": dataCost
    }
  } catch (error) {
    let res_error = {
      errCode: errorConstants.codeError,
      errMsg: error.message,
    };
    logger.error(JSON.stringify(res_error), {
      method: "tasksPerEmployee",
    });
    return res_error;
  }
}

module.exports = {
  projectsPerDateService: projectsPerDateService,
  percentOfTagsService: percentOfTagsService,
  tasksPerEmployee: tasksPerEmployee,
  costPerDate:costPerDate
};
