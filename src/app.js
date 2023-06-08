const express = require("express");
const cors = require("cors");
const config = require("./util/config");
const logger = require("./util/logger");

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: config.limit_rate, // limit each IP to 100 requests per windowMs
});

class Server {
  constructor() {
    this.app = express();

    // Initialize Limiter
    
    //  apply to all requests
    this.app.use(limiter);

    this.app.use(
      '/api-docs',
      swaggerUi.serve, 
      swaggerUi.setup(swaggerDocument)
    );

    this.port = config.port;

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    // CORS
    //this.app.use(cors());
    this.app.use(cors({
      origin: ['http://localhost:8069','http://localhost:8100','http://127.0.0.1:8069']
    }));
    // Lectura y parseo del body
    this.app.use(express.json());
    // Rate limiter
    //this.app.use(rateLimiterUsingThirdParty);

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
      logger.info("Server running on port " + this.port, {
        method: Object.values(this)[0].name,
      });
    });
  }
}

const server = new Server();
server.listen();
