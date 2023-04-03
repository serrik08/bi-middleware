require('dotenv').config();

module.exports = {
  odoo_service: process.env.ODOO_SERVICE,
  odoo_service_login: process.env.ODOO_SERVICE_LOGIN,
  odoo_db: process.env.ODOO_DB,
  odoo_app: process.env.ODOO_APP,
  port: process.env.PORT,
  limit_rate: process.env.LIMIT_RATE,
  jwt_expire_time: process.env.JWT_EXPIRE_TIME,
  mongo_url: process.env.MONGO_URL,
  mongo_db_name: process.env.MONGO_DB_NAME,
  login_try: process.env.LOGIN_TRY
};