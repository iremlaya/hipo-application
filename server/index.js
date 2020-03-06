const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolver');

const HipoAPI = require('./base/api');

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  dataSources: () => ({
    hipoAPI: new HipoAPI(),
  }),
});

server.listen().then(({url}) => {
  console.log(`GraphQL server is running at ${url}`);
});
