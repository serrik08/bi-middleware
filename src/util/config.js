require('dotenv').config();

module.exports = {
  odoo_service: process.env.ODOO_SERVICE,
  odoo_db: process.env.ODOO_DB,
  odoo_app: process.env.ODOO_APP,
  port: process.env.PORT,

  mongo_url: process.env.MONGO_URL,
  mongo_db_name: process.env.MONGO_DB_NAME
};