const odooService = require('../services/odoo/index')

class OdooController {
  // We are using constructor injection.
  constructor(opts) {
    // Save a reference to our dependency.
    this.odooService = odooService
  }

  async login(req, res) {
    let result = await this.odooService.login(req, res)
    return result
  }

  async updatedata(req, res) {
    let result = await this.odooService.updatedata(req, res)
    return result
  }

  async projects(req, res) {
    let result = await this.odooService.projects(req, res)
    return result
  }

}

module.exports = OdooController;