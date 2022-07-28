const odooService = require("../services/odoo/index");

class OdooController {
  // We are using constructor injection.
  constructor(opts) {
    // Save a reference to our dependency.
    this.odooService = odooService;
  }

  async login(req, res) {
    let result = await this.odooService.login(req, res);
    return result;
  }

  async updatedata(req, res) {
    let result = await this.odooService.updatedata(req, res);
    return result;
  }

  async getprojects(req, res) {
    let result = await this.odooService.getprojects(req, res);
    return result;
  }

  async projects(req, res) {
    let result = await this.odooService.projects(req, res);
    return result;
  }

  async chartProjectsPerDate(req, res) {
    let result = await this.odooService.chartProjectsPerDate(req, res);
    return result;
  }

  async chartPercentOfTags(req, res) {
    let result = await this.odooService.chartPercentOfTags(req, res);
    return result;
  }

  async chartTasksPerEmployee(req, res) {
    let result = await this.odooService.chartTasksPerEmployee(req, res);
    return result;
  }

  async chartCostPerDate(req, res) {
    let result = await this.odooService.chartCostPerDate(req, res);
    return result;
  }

  async getEmployees(req, res) {
    let result = await this.odooService.getEmployees(req, res);
    return result;
  }
  
  async getKpiErp(req, res) {
    let result = await this.odooService.getKpiErp(req, res);
    return result;
  }
}

module.exports = OdooController;
