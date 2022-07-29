const { Router } = require("express");
const awilix = require("awilix");
//const tool = require('../src/util/tool');
const errorConstants = require("../util/errorConstants");
const OdooController = require("../controllers/odooController");
const router = Router();
const logger = require("../util/logger");
const config = require("../util/config");

const jwt = require("jsonwebtoken");

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  // Here we are telling Awilix how to resolve a
  1: awilix.asClass(OdooController), // ODOO
});

router.post("/login", async (req, res) => {
  logger.info("begin", { method: "login" });
  let result;
  try {
    result = await container.resolve(req.body.data.serviceId).login(req, res);
    if (result.errCode === "0") {
      // Create JWT with user odoo response for authentication
      let token = await jwt.sign({ user: result.user }, "bi-app", {
        expiresIn: config.jwt_expire_time,
      });
      res.json({ token });
      logger.info(JSON.stringify({ token }), { method: "login" });
    } else {
      res.send(result);
      logger.error(JSON.stringify({ result }), { method: "login" });
    }
  } catch (error) {
    result = {
      errCode: errorConstants.codeError,
      errMsg: errorConstants.desError,
    };
    res.send(result);
    logger.error(JSON.stringify({ result }), { method: "login" });
  }
  logger.info("end", { method: "login" });
});

router.post("/projects", verifyToken, async (req, res) => {
  logger.info("begin", { method: "projects" });
  let jwtToken = getJwtToken(req.token||req.header('Authorization'));
  jwt.verify(jwtToken, "bi-app", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
      logger.error(JSON.stringify({ err }), { method: "projects" });
    } else {
      let result;
      console.log(authData);
      try {
        result = await container.resolve(req.body.serviceId).projects(req, res);        
        res.send(result);
        logger.info("end", { method: "projects" });
      } catch (error) {
        console.log("error: ", error);
        result = {
          errCode: errorConstants.codeError,
          errMsg: errorConstants.desError,
        };
        res.send(result);
        logger.error(JSON.stringify({ result }), { method: "projects" });
      }
    }
  });
});

router.post("/updatedata", verifyToken, async (req, res) => {
  logger.info("begin", { method: "updatedata" });  
  let jwtToken = getJwtToken(req.token||req.header('Authorization'));
  jwt.verify(jwtToken, "bi-app", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
      logger.error(JSON.stringify({ err }), { method: "updatedata" });
    } else {
      let result;
      console.log(authData);
      try {
        result = await container.resolve(req.body.serviceId).updatedata(req, res);        
        res.send(result);
        logger.info("end", { method: "updatedata" });
      } catch (error) {
        console.log("error: ", error);
        result = {
          errCode: errorConstants.codeError,
          errMsg: errorConstants.desError,
        };
        res.send(result);
        logger.error(JSON.stringify({ result }), { method: "updatedata" });
      }
    }
  });
});

router.post("/getprojects", verifyToken, async (req, res) => {
  logger.info("begin", { method: "getprojects" });  
  let jwtToken = getJwtToken(req.token||req.header('Authorization'));
  jwt.verify(jwtToken, "bi-app", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
      logger.error(JSON.stringify({ err }), { method: "getprojects" });
    } else {
      let result;
      console.log(authData);
      try {
        result = await container.resolve(req.body.serviceId).getprojects(req, res);        
        res.send(result);
        logger.info("end", { method: "getprojects" });
      } catch (error) {
        console.log("error: ", error);
        result = {
          errCode: errorConstants.codeError,
          errMsg: errorConstants.desError,
        };
        res.send(result);
        logger.error(JSON.stringify({ result }), { method: "getprojects" });
      }
    }
  });
});

router.post("/chartprojectsperdate", verifyToken, async (req, res) => {
  logger.info("begin", { method: "chartprojectsperdate" });  
  let jwtToken = getJwtToken(req.token||req.header('Authorization'));
  jwt.verify(jwtToken, "bi-app", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
      logger.error(JSON.stringify({ err }), { method: "chartprojectsperdate" });
    } else {
      let result;
      console.log(authData);
      try {
        result = await container.resolve(req.body.serviceId).chartProjectsPerDate(req, res);        
        res.send(result);
        logger.info("end", { method: "chartprojectsperdate" });
      } catch (error) {
        console.log("error: ", error);
        result = {
          errCode: errorConstants.codeError,
          errMsg: errorConstants.desError,
        };
        res.send(result);
        logger.error(JSON.stringify({ result }), { method: "chartprojectsperdate" });
      }
    }
  });
});

router.post("/chartpercentoftags", verifyToken, async (req, res) => {
  logger.info("begin", { method: "chartpercentoftags" });  
  let jwtToken = getJwtToken(req.token||req.header('Authorization'));
  jwt.verify(jwtToken, "bi-app", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
      logger.error(JSON.stringify({ err }), { method: "chartpercentoftags" });
    } else {
      let result;
      console.log(authData);
      try {
        result = await container.resolve(req.body.serviceId).chartPercentOfTags(req, res);        
        res.send(result);
        logger.info("end", { method: "chartpercentoftags" });
      } catch (error) {
        console.log("error: ", error);
        result = {
          errCode: errorConstants.codeError,
          errMsg: errorConstants.desError,
        };
        res.send(result);
        logger.error(JSON.stringify({ result }), { method: "chartpercentoftags" });
      }
    }
  });
});

router.post("/charttasksperemployee", verifyToken, async (req, res) => {
  logger.info("begin", { method: "charttasksperemployee" });  
  let jwtToken = getJwtToken(req.token||req.header('Authorization'));
  jwt.verify(jwtToken, "bi-app", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
      logger.error(JSON.stringify({ err }), { method: "charttasksperemployee" });
    } else {
      let result;
      console.log(authData);
      try {
        result = await container.resolve(req.body.serviceId).chartTasksPerEmployee(req, res);        
        res.send(result);
        logger.info("end", { method: "charttasksperemployee" });
      } catch (error) {
        console.log("error: ", error);
        result = {
          errCode: errorConstants.codeError,
          errMsg: errorConstants.desError,
        };
        res.send(result);
        logger.error(JSON.stringify({ result }), { method: "charttasksperemployee" });
      }
    }
  });
});
router.post("/chartcostperdate", verifyToken, async (req, res) => {
  logger.info("begin", { method: "chartcostperdate" });  
  let jwtToken = getJwtToken(req.token||req.header('Authorization'));
  jwt.verify(jwtToken, "bi-app", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
      logger.error(JSON.stringify({ err }), { method: "chartcostperdate" });
    } else {
      let result;
      console.log(authData);
      try {
        result = await container.resolve(req.body.serviceId).chartCostPerDate(req, res);        
        res.send(result);
        logger.info("end", { method: "chartcostperdate" });
      } catch (error) {
        console.log("error: ", error);
        result = {
          errCode: errorConstants.codeError,
          errMsg: errorConstants.desError,
        };
        res.send(result);
        logger.error(JSON.stringify({ result }), { method: "chartcostperdate" });
      }
    }
  });
});
router.post("/getemployees", verifyToken, async (req, res) => {
  logger.info("begin", { method: "getemployees" });  
  let jwtToken = getJwtToken(req.token||req.header('Authorization'));
  jwt.verify(jwtToken, "bi-app", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
      logger.error(JSON.stringify({ err }), { method: "getemployees" });
    } else {
      let result;
      console.log(authData);
      try {
        result = await container.resolve(req.body.serviceId).getEmployees(req, res);        
        res.send(result);
        logger.info("end", { method: "getemployees" });
      } catch (error) {
        console.log("error: ", error);
        result = {
          errCode: errorConstants.codeError,
          errMsg: errorConstants.desError,
        };
        res.send(result);
        logger.error(JSON.stringify({ result }), { method: "getemployees" });
      }
    }
  });
});

router.post("/getkpierp", verifyToken, async (req, res) => {
  logger.info("begin", { method: "getkpierp" });  
  let jwtToken = getJwtToken(req.token||req.header('Authorization'));
  jwt.verify(jwtToken, "bi-app", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
      logger.error(JSON.stringify({ err }), { method: "getkpierp" });
    } else {
      let result;
      console.log(authData);
      try {
        result = await container.resolve(req.body.serviceId).getKpiErp(req, res);        
        res.send(result);
        logger.info("end", { method: "getkpierp" });
      } catch (error) {
        console.log("error: ", error);
        result = {
          errCode: errorConstants.codeError,
          errMsg: errorConstants.desError,
        };
        res.send(result);
        logger.error(JSON.stringify({ result }), { method: "getkpierp" });
      }
    }
  });
});

// Verify token
function verifyToken(req, res, next) {
  // Get auth header token
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get the token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

function getJwtToken(tokenBearer) {
  tokenBearer = tokenBearer.split(" ");
  if (tokenBearer.length === 1)
    return tokenBearer[0]
  return tokenBearer[1]
}

router.post("/test", async (req, res) => {
  let result;
  try {
    result = await container.resolve(req.body.data.serviceId).test(req, res);
  } catch (error) {
    result = {
      errCode: errorConstants.codeError,
      errMsg: errorConstants.desError,
    };
  }
  res.send(result);
});

module.exports = router;
