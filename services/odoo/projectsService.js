const errorConstants = require("../../util/errorConstants");
const config = require("../../util/config");

const validateFields = (body) => {
  if (
    body.data.user_id === undefined ||
    body.data.password === undefined ||
    body.data.token === undefined
  )
    throw new Error("NO DATA| Campo usuario o token no definido");
  if (
    body.data.user_id === "" ||
    body.data.password === "" ||
    body.data.token === ""
  )
    throw new Error("NO DATA| Campo usuario y token son obligatorios");
};

const prepareRequest = (body) => {
  return {
    jsonrpc: "2.0",
    method: "call",
    params: {
      service: "object",
      method: "execute",
      args: [
        config.odoo_db,
        body.data.user_id,
        body.data.password,
        "project.project",
        "search_read",
        [],
        [],
      ],
    },
  }
}

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
      errCode: "",
      errMsg: "",
      data: {},
    }
    let projects = response.result
    Object.assign(result.data, { projects })
  }
  return result
}

module.exports = {
  validateFieldsProjects: validateFields,
  prepareRequestProjects: prepareRequest,
  prepareResponseProjects: prepareResponse,
}
