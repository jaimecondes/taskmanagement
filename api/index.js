require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers/taskResolver');

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
try{
     await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
}catch(error){console.log(error)}
 

  app.listen({ port: 3000 }, () =>
    console.log(`Server ready at http://localhost:3000${server.graphqlPath}`)
  );
};

startServer();
