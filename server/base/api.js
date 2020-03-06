const {RESTDataSource} = require('apollo-datasource-rest');

class HipoAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://hipolabs.com/api/';
  }

  reduceToSchema(response) {
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      position: response.position,
      selected_periods: response.selected_periods,
      cv: response.cv,
      notes: response.notes,
    };
  }

  reduceToPeriodSchema(response) {
    return {
      id: response.id,
      name: response.name,
      positions: response.positions,
      start_date: response.start_date,
      end_date: response.end_date,
      last_application_date: response.last_application_date,
      location: response.location,
    };
  }

  reduceToPositionSchema(response) {
    return {
      id: response.id,
      name: response.name,
    };
  }

  async listInternshipPeriods() {
    const response = await this.get('internship-periods/');
    response.map(r => this.reduceToPeriodSchema(r));
    return response;
  }
  async listInternshipPositions() {
    const response = await this.get('internship-positions/');
    response.map(r => this.reduceToPositionSchema(r));
    return response;
  }
  async retrieveInternshipApplication({id}) {
    const response = await this.get(`internship-applications/${id}`);
    console.log(response);
    return this.reduceToSchema(response);
  }

  async updateInternshipApplication(body) {
    const response = await this.put(`internship-applications/${body.id}`, body);
    console.log(response);
    return response;
  }

  async createInternshipApplication(application) {
    const response = await this.post('internship-applications/', application);
    console.log(response);
    return response;
    //return this.reduceToSchema(response);
  }
}

module.exports = HipoAPI;
