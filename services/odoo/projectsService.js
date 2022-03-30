const errorConstants = require('../../util/errorConstants')
const config = require('../../util/config')

const validateFields = (body) => {
  if (body.data.user === undefined || body.data.token === undefined)
    throw new Error("NO DATA| Campo usuario o token no definido")
  if (body.data.user === '' || body.data.token === '')
    throw new Error("NO DATA| Campo usuario y token son obligatorios")
}

const prepareRequest = (body) => {
  return {
    auth: {
      username: body.data.user,
      password: body.data.token
    }
  }
}

const prepareResponse = (res) => {
  let response = res.data
  let result = {}
  if (response.error != undefined) {
    if (response.error.data.message === "Access Denied") {
      result.errCode = errorConstants.ERR1002.codeError
      result.errMsg = errorConstants.ERR1002.desError
      Object.assign(result, { data: [] })
    } else {
      result.errCode = errorConstants.ERR1003.codeError
      result.errMsg = errorConstants.ERR1003.desError + response.error.data.message
      Object.assign(result, { data: [] })
    }
  } else {
    result = {
      errCode: '',
      errMsg: '',
      data: {}
    }

    // let users = []
    // let objUser = {}
    // let user = {}
    // user = {
    //   uid: response.result.uid.toString(),
    //   name: response.result.name,
    //   username: response.result.username,
    //   session_id: res.headers['set-cookie'][0].split(';')[0].substring(11) //get token
    // }
    // objUser = { user }
    // users.push(objUser)
    // Object.assign(result.data, { users })
    let projects = response
    Object.assign(result.data, { projects })
  }
  return result
}


module.exports = {
  validateFieldsProjects: validateFields,
  prepareRequestProjects: prepareRequest,
  prepareResponseProjects: prepareResponse
}