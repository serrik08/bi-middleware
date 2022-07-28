const errorConstants = require("../../util/errorConstants");
const axios = require("axios");
const config = require("../../util/config");
const logger = require("../../util/logger");
const connection = require("../../dataAccess/mongoConnection");

const Quarters = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
];

const getKpiErpService = async (req, res) => {
  logger.info("begin", { method: "getKpiErpService" });
  logger.info("body service: " + JSON.stringify(req.body), {
    method: "getKpiErpService",
  });
  let result;
  try {
    result =[];
    result.push( await getKpiErp('Kpi Total Proyectos','projects'));
    result.push( await getKpiErp('Kpi Total Tareas','tasks'));
    
    logger.info("Result: " + JSON.stringify(result), {
      method: "getKpiErpService",
    });
    logger.info("end", { method: "getKpiErpService" });
    return result;
  } catch (error) {
    let res_error = {
      errCode: errorConstants.codeError,
      errMsg: error.message,
    };
    logger.error(JSON.stringify(res_error), { method: "getKpiErpService" });
    return res_error;
  }
};

const getQarter = (month) => {
  let quarter;
  Quarters.forEach((arr) => {
    if (arr.includes(month)) {
      quarter = Quarters.indexOf(arr);
    }
  });
  return quarter;
};

const getKpiErp = async(title,collection) => {
  let objects = await connection.getDocuments(collection);
  let currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();
  let currentQuarter = getQarter(currentMonth);
  let pastQuarter = currentQuarter !== 0 ? currentQuarter-1 : 3;
  console.log(pastQuarter,currentQuarter);
  
  countListQuarter = getCountQuarters(objects,currentQuarter,pastQuarter,collection);
  let percent = countListQuarter[0]/ countListQuarter[1];
  let colorPercent = getColorPercent(percent);
  return {
    title:title,
    pastQuarter: {quarter: (pastQuarter==0)?currentYear-1:currentYear+'.Q'+(parseInt(pastQuarter)+1), qty: countListQuarter[1]},
    currentQuarter: {quarter: currentYear+'.Q'+(parseInt(currentQuarter)+1),qty: countListQuarter[0]},
    percent: percent,
    colorPercent:colorPercent
  }
};

const getColorPercent = (percent) => {
  percent = percent *100;
  if (percent <= 50)
    return 1
  if (percent <= 90)
    return 2
  if (percent > 90)
    return 3
}

const getCountQuarters = (objects,currentQuarter,pastQuarter,collection) => {  
  let currentObjects,pastObjects;
  if (collection === 'projects') {
    currentObjects = getCountProjects(objects,currentQuarter);
    pastObjects = getCountProjects(objects,pastQuarter);
  }
  if (collection === 'tasks') {
    currentObjects = getCountTasks(objects,currentQuarter);
    pastObjects = getCountTasks(objects,pastQuarter);
  }
  return [currentObjects,pastObjects];
}

const getCountProjects = (objects, quarter) => {
  return objects.filter( o => Quarters[quarter].includes(parseInt(o['bi_real_date_finish'].substring(5,7)))).length;
}

const getCountTasks = (objects, quarter) => {
  return objects.filter( o => 
    Quarters[quarter].includes( parseInt(o['date_deadline'].substring(5,7)) ))
    .length;
}

module.exports = {
  getKpiErpService: getKpiErpService,
};
