const { Router } = require('express');
const awilix = require('awilix')
const tool = require('../util/tool');
const errorConstants = require('../util/errorConstants');
const OdooController = require('../controllers/odooController')
const router = Router();

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

container.register({
  // Here we are telling Awilix how to resolve a
  1: awilix.asClass(OdooController), // ODOO
})

router.post('/login', async (req, res) => {
  let result
  try {
    result = await container.resolve(req.body.data.serviceId).login(req, res)
  } catch (error) {
    console.log("error: ", error)
    result = {
      errCode: errorConstants.codeError,
      errMsg: errorConstants.desError,
    }
  }
  res.send(result)
})

router.post('/projects', async (req, res) => {
  let result
  try {
    result = await container.resolve(req.body.data.serviceId).projects(req, res)
  } catch (error) {
    console.log("error: ", error)
    result = {
      errCode: errorConstants.codeError,
      errMsg: errorConstants.desError,
    }
  }
  res.send(result)
})


router.post('/test', async (req, res) => {
  let result;
  try {
    result = await container.resolve(req.body.data.serviceId).test(req, res);
  } catch (error) {
    result = {
      errCode: errorConstants.codeError,
      errMsg: errorConstants.desError,
    };
  }
  res.send(result)
})

module.exports = router;