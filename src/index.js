const express = require("express");
const cors = require("cors");
const config = require("./util/config");

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

class Server {
  constructor() {
    this.app = express();
    this.port = config.port;

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());

    // this.app.use(function (req, res, next) {
    //   res.header("Access-Control-Allow-Origin", config.odoo_app)
    //   res.header("Access-Control-Allow-Methods","POST")
    //   next()
    // })
  }

  routes() {
    this.app.use("/", require("./routes"));
  }

  listen() {
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );

    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

const server = new Server();
server.listen();
