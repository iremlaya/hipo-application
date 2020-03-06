module.exports = {
  Query: {
    apply: (_, application, {dataSources}) =>
      dataSources.hipoAPI.createInternshipApplication(application),
    retrieveApplication: (_, {id}, {dataSources}) =>
      dataSources.hipoAPI.retrieveInternshipApplication({id}),
    listInternshipPeriods: (_, args, {dataSources}) =>
      dataSources.hipoAPI.listInternshipPeriods(),
    listInternshipPositions: (_, args, {dataSources}) =>
      dataSources.hipoAPI.listInternshipPositions(),
  },
};
