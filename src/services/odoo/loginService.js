const errorConstants = require("../../util/errorConstants");
const config = require("../../util/config");
const axios = require("axios");
const logger = require("../../util/logger");
const connection = require("../../dataAccess/mongoConnection");

const loginService = async (req, res) => {
  logger.info("begin", { method: "loginServiceOdoo" });
  logger.info("body service: " + JSON.stringify(req.body), {
    method: "loginServiceOdoo",
  });
  try {
    let attempUserLogin = await setAttemptUserLogin(req.body.data.user);
    if (attempUserLogin >= config.login_try) {
      throw new Error("ERR1004");
    }
    await validateFields(req.body);
    let endpointLogin = `${config.odoo_service_login}`;
    logger.info("endpointLogin ext: " + endpointLogin, {
      method: "loginServiceOdoo",
    });
    let parameters = await prepareRequest(req.body);
    let resultServiceLogin = await axios.post(endpointLogin, parameters);
    logger.info("response ext Login: " + JSON.stringify(resultServiceLogin.data), { method: "loginServiceOdoo" });
    let parametersForUser = await prepareRequestGetUser(req.body, resultServiceLogin.data.result);
    let resultServiceUser = await axios.post(endpointLogin, parametersForUser, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:8069',
      }
    });
    let result = await prepareResponse(resultServiceUser, req.body.data.user);
    if (result.errCode === 'ERR1002') {
      throw new Error("ERR1002");
    }
    if (result.errCode === 'ERR1003') {
      throw new Error("ERR1003");
    }
    if (result.errCode === 'ERR1004') {
      throw new Error("ERR1004");
    }

    //ApiKey;
    let endpoint = `${config.odoo_service}/res.users/${result.user.uid}`;
    logger.info("endpointApiKey ext: " + endpoint, { method: "loginServiceOdoo" });
    let auth = {
      username: result.user.username, password: req.body.data.apiToken,
    };
    let resultServiceApiKey = await axios.get(endpoint, {auth: auth});
    await validateApiKey(resultServiceApiKey.data, auth);
    logger.info("response ext ApiKey: " + JSON.stringify(resultServiceApiKey.data), {
      method: "loginServiceOdoo",
    });
    logger.info("response service: " + JSON.stringify(result), {
      method: "loginServiceOdoo",
    });
    logger.info("end", { method: "loginServiceOdoo" });
    await resetAttemptUserLogin(req.body.data.user);
    return result;
  } catch (error) {
    let res_error = {};
    if (error.message === 'ERR1004') {
      res_error = {
        errCode: errorConstants.ERR1004.codeError,
        errMsg: errorConstants.ERR1004.desError,
        data: { attempUserLogin: attempUserLogin },
      };
    } else  if (error.response?.data?.error === "Permissions") {
      res_error = {
        errCode: errorConstants.ERR1005.codeError,
        errMsg: errorConstants.ERR1005.desError,
        data: { attempUserLogin: attempUserLogin },
      };
    } else if (error.message === 'ERR1002') {
      res_error = {
        errCode: errorConstants.ERR1002.codeError,
        errMsg: errorConstants.ERR1002.desError,
        data: { attempUserLogin: attempUserLogin },
      };
    } else if (error.message === "NO DATA| Campo usuario, password o apiToken no definido") {
      res_error = {
        errCode: errorConstants.ERR1003.codeError,
        errMsg: errorConstants.ERR1003.desError + error.message,
        data: { attempUserLogin: attempUserLogin },
      };
    } else if (error.message === 'ERR1005') {
      res_error = {
        errCode: errorConstants.ERR1005.codeError,
        errMsg: errorConstants.ERR1005.desError,
        data: { attempUserLogin: attempUserLogin },
      };
    }
    else if (error.response.data.error_descrip === "Your token could not be authenticated.") {
      res_error = {
        errCode: errorConstants.ERR1005.codeError,
        errMsg: errorConstants.ERR1005.desError,
        data: { attempUserLogin: attempUserLogin },
      };
    }
    else {
      res_error = {
        errCode: errorConstants.ERR1003.codeError,
        errMsg: errorConstants.ERR1003.desError + error.message,
        data: [],
      };
    }
    logger.error(JSON.stringify(res_error), { method: "loginServiceOdoo" });
    return res_error;
  }
};

const validateApiKey = (res, user) => {
  if (res.login !== user.username || res.openapi_token !== user.password) {
    logger.error(JSON.stringify(user), { method: "loginServiceOdoo" });
    throw new Error("ERR1005");
  }
}

const validateFields = (body) => {
  if (body.data.user === undefined || body.data.password === undefined || body.data.apiToken === undefined)
    throw new Error("NO DATA| Campo usuario, password o apiToken no definido");
  if (body.data.user === "" || body.data.password === "" || body.data.apiToken === '')
    throw new Error("NO DATA| Campo usuario, password o apiToken son obligatorios");
};

const prepareRequest = (body) => {
  let request = {
    jsonrpc: "2.0",
    params: {
      service: "common",
      method: "login",
      args: [config.odoo_db, body.data.user, body.data.password]
    },
  };
  logger.info("request ext: " + JSON.stringify(request), {
    method: "loginServiceOdoo",
  });
  return request;
};

const prepareRequestGetUser = (body, id) => {
  let request = {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute",
      args: [config.odoo_db, id, body.data.password, "res.users", "search_read", [["id", "=", id]], ["id", "name", "login"]]
    },
  };
  logger.info("request ext: " + JSON.stringify(request), {
    method: "loginServiceOdoo",
  });
  return request;
};

const prepareResponse = async (res, user) => {
  let response = res.data.result[0];
  let result = {};
  if (response.error != undefined) {
    if (response.error.data.message === "Access Denied") {
      result.errCode = errorConstants.ERR1002.codeError;
    } else if (
      response.error.data.message ===
      "Too many login failures, please wait a bit before trying again."
    ) {
      result.errCode = errorConstants.ERR1004.codeError;
    } else {
      result.errCode = errorConstants.ERR1003.codeError;
    }
  } else {
    result = {
      errCode: "0",
      errMsg: "",
    };
    let user = {
      uid: response.id.toString(),
      name: response.name,
      username: response.login,
      session_id: 'test-session-id'
      ///session_id: res.headers["set-cookie"][0].split(";")[0].substring(11), //get token
    };
    Object.assign(result, { user });
  }
  return result;
};

const setAttemptUserLogin = async (user) => {
  console.log(user);
  let res = await connection.attemptUserLogin(user);
  return res;
}
const resetAttemptUserLogin = async (user) => {
  await connection.resetAttemptUserLogin(user);
}

module.exports = {
  loginService: loginService,
};
