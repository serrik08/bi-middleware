const errorConstants = require("../../util/errorConstants");
const axios = require("axios");
const config = require("../../util/config");
const logger = require("../../util/logger");
const connection = require("../../dataAccess/mongoConnection");
const { assign } = require("underscore");

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
    let resultService = await axios.get(endpointLogin, {
      auth: {
        username: req.body.userOdoo,
        password: req.body.tokenOdoo,
      },
    });
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
          description: "no data saved"
        }
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
  logger.info("body service: " + JSON.stringify(req.body), { method: "getprojectsService"  });
  try {
    let projects =  await connection.getDocuments("projects");

    let result = await addStagesToProject(projects);    
 
    //console.log(stages);
    //let result =  projects
    logger.info("Result: "+JSON.stringify(result), { method: "getprojectsService" });
    logger.info("end", { method: "getprojectsService" });
    return result;
  } catch (error) {
    let res_error = {
      errCode: errorConstants.codeError,
      errMsg: error.message
    };
    logger.error(JSON.stringify(res_error), { method: "getprojectsService" });
    return res_error;
  }
};

const addStagesToProject = async (projects) => {  
  let stages =  await connection.getDocuments("stage");
  projects.forEach(element => {
    stage_name= {stage_name: stages.find(o => o.id === element.stage_id).name};
    element = Object.assign(element,stage_name)
    console.log(element.stage_id + '-'+JSON.stringify( stages[element.stage_id]));
  });
  return projects;
}

const validateFields = (body) => {
  if (body.userOdoo === undefined || body.tokenOdoo === undefined)
    throw new Error("NO DATA| Campo usuario o token no definido");
  if (body.userOdoo === "" || body.tokenOdoo === "")
    throw new Error("NO DATA| Campo usuario y token son obligatorios");
};

module.exports = {
  projectsService: projectsService,
  getprojectsService: getprojectsService
};
