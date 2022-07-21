const errorConstants = require("../../util/errorConstants");
const config = require("../../util/config");
const axios = require("axios");
const logger = require("../../util/logger");

const loginService = async (req, res) => {
  logger.info("begin", { method: "loginServiceOdoo" });
  logger.info("body service: "+JSON.stringify(req.body) , { method: "loginServiceOdoo" });
  try {
    await validateFields(req.body);
    let endpointLogin = `${config.odoo_service}/web/session/authenticate`;
    logger.info("endpoint ext: "+endpointLogin , { method: "loginServiceOdoo" });
    let parameters = await prepareRequest(req.body);    
    let resultService = await axios.post(
      endpointLogin,
      parameters
    );
    logger.info("response ext: "+JSON.stringify(resultService.data) , { method: "loginServiceOdoo" });
    let result = prepareResponse(resultService);   
    logger.info("response service: "+JSON.stringify(result) , { method: "loginServiceOdoo" });
    logger.info("end", { method: "loginServiceOdoo" });
    return result;
  } catch (error) {
    console.log(error);
    let res_error = {
      errCode: errorConstants.codeError,
      errMsg: error.message,
      data: [],
    };
    logger.error(JSON.stringify(res_error), { method: "loginServiceOdoo" });
    return res_error;
  }
  
};

const validateFields = (body) => {
  if (body.data.user === undefined || body.data.password === undefined)
    throw new Error("NO DATA| Campo usuario o password no definido");
  if (body.data.user === "" || body.data.password === "")
    throw new Error("NO DATA| Campo usuario y password son obligatorios");
};

const prepareRequest = (body) => {
  let request = {
    jsonrpc: "2.0",
    params: {
      db: config.odoo_db,
      login: body.data.user,
      password: body.data.password,
    },
  };
  logger.info("request ext: "+JSON.stringify(request) , { method: "loginServiceOdoo" });
  return request;
};

const prepareResponse = (res) => {
  let response = res.data;
  let result = {};
  if (response.error != undefined) {
    if (response.error.data.message === "Access Denied") {
      result.errCode = errorConstants.ERR1002.codeError;
      result.errMsg = errorConstants.ERR1002.desError;
      Object.assign(result, { data: [] });
    } else {
      result.errCode = errorConstants.ERR1003.codeError;
      result.errMsg =
        errorConstants.ERR1003.desError + response.error.data.message;
      Object.assign(result, { data: [] });
    }
  } else {
    result = {
      errCode: "0",
      errMsg: "",
    };
    let user = {
      uid: response.result.uid.toString(),
      name: response.result.name,
      username: response.result.username,
      session_id: res.headers["set-cookie"][0].split(";")[0].substring(11), //get token
    };
    Object.assign(result, { user });
  }
  return result;
};

module.exports = {
  loginService: loginService,
};
