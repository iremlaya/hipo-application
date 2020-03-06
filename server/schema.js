/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
const { gql } = require('apollo-server');
const typeDefs = gql`
  type Query {
    apply(
      name: String
      email: String
      position: Int
      selected_periods: [Int]
      cv: String
      notes: String
    ): Application,
    retrieveApplication(
        id: ID
    ): Application,
    listInternshipPeriods : [PeriodQ],
    listInternshipPositions: [Position]
  }
  type Application {
    id: ID,
    name: String
    email: String
    position: Position
    selected_periods: [PeriodQ]
    cv: String
    notes: String
  }
  type Position {
    id: Int
    name: String
  }
  type PeriodQ {
    id: Int,
    name: String,
    positions: [Position],  
    start_date: String
    end_date: String
    last_application_date: String
    location: String
  }
`;


module.exports = typeDefs;