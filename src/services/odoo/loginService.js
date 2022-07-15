const errorConstants = require("../../util/errorConstants");
const config = require("../../util/config");
const axios = require("axios");

const loginService = async (req, res) => {
  try {
    await validateFields(req.body);
    let parameters = prepareRequest(req.body);
    let resultService = await axios.post(
      `${config.odoo_service}/web/session/authenticate`,
      parameters
    );
    let result = prepareResponse(resultService);
    return result;
  } catch (error) {
    return {
      errCode: errorConstants.codeError,
      errMsg: error.message,
      data: [],
    };
  }
};

const validateFields = (body) => {
  if (body.data.user === undefined || body.data.password === undefined)
    throw new Error("NO DATA| Campo usuario o password no definido");
  if (body.data.user === "" || body.data.password === "")
    throw new Error("NO DATA| Campo usuario y password son obligatorios");
};

const prepareRequest = (body) => {
  return {
    jsonrpc: "2.0",
    params: {
      db: config.odoo_db,
      login: body.data.user,
      password: body.data.password,
    },
  };
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
      errMsg: ""
    };
    let user = {
      uid: response.result.uid.toString(),
      name: response.result.name,
      username: response.result.username,
      session_id: res.headers["set-cookie"][0].split(";")[0].substring(11), //get token
    };
    Object.assign(result, {user});
  }
  return result;
};

module.exports = {
  loginService: loginService
};
