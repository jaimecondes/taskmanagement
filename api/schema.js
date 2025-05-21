const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Task {
    id: ID!
    name: String!
    description: String
    dueDate: String
    done: Boolean!
  }

  type Query {
    tasks(page: Int, limit: Int, done: Boolean, overdue: Boolean): [Task]
    task(id: ID!): Task
  }

  type Mutation {
    addTask(name: String!, description: String, dueDate: String): Task
    updateTask(id: ID!, name: String, description: String, dueDate: String, done: Boolean): Task
    deleteTask(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
