const { Router } = require("express");
const awilix = require("awilix");
//const tool = require('../src/util/tool');
const errorConstants = require("../util/errorConstants");
const OdooController = require("../controllers/odooController");
const router = Router();
const logger = require("../util/logger");

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
    //console.log(result);
    if (result.errCode === "0") {
      // Create JWT with user odoo response for authentication
      let token = await jwt.sign({ user: result.user }, "bi-app", {
        expiresIn: "30m",
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

// router.post("/projects", async (req, res) => {
//   let result;
//   try {
//     result = await container
//       .resolve(req.body.data.serviceId)
//       .projects(req, res);
//   } catch (error) {
//     console.log("error: ", error);
//     result = {
//       errCode: errorConstants.codeError,
//       errMsg: errorConstants.desError,
//     };
//   }
//   res.send(result);
// });

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
