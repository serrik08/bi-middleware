const errorConstants = require("../../util/errorConstants");
const axios = require("axios");
const config = require("../../util/config");
const logger = require("../../util/logger");
const connection = require("../../dataAccess/mongoConnection");
const { set } = require("mongoose");

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
    return {label:"Proyectos",data:data};
    //return {label:"Proyectos",data:[{ x:"05-2016",y: 3 },{x:"06-2016",y:10},{x:"07-2016",y:7}]};
  } catch (error) {
    let res_error = {
      errCode: errorConstants.codeError,
      errMsg: error.message,
    };
    logger.error(JSON.stringify(res_error), { method: "projectsPerDateService" });
    return res_error;
  }
}

const countDateProjects = (arrDateProjects) =>{
  const tempArray = [...arrDateProjects].sort();
  let countDate =1;
  let date='';
  let arrDate = [];
  tempArray.forEach( element => {
    if (element === date){
      countDate += 1;
    } else {
      if (date !== '') {
        arrDate.push({x:date,y:countDate});
        countDate=1;
        date=element;
      } else 
        date = element;
    }
  })
  arrDate.push({x:date,y:countDate});
  return arrDate;
}

const getDateProjects = (projects) => {
  arrDate = [];
  projects.forEach((element) => {
    if (element.bi_real_date_finish !== undefined && element.bi_real_date_finish !== "")
      //element.bi_real_date_finish = element.bi_real_date_finish.substring(0, 10);
      arrDate.push(element.bi_real_date_finish.substring(0, 7));
  });
  return arrDate;
}

module.exports = {
  projectsPerDateService: projectsPerDateService,
};
