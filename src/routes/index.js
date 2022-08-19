const routes = require("express").Router();
const endpoints = require("./endpoints");

routes.get("", async (req, res) => {
  return res.send("Project middleware BI HOME");
});

routes.use("/api/v1", endpoints);

module.exports = routes;
