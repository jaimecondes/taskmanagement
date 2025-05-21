const { gql } = require('apollo-server-express');

module.exports = gql`
  type Task {
    id: ID!
    name: String!
    description: String!
    dueDate: String!
    done: Boolean!
  }

  type Query {
    tasks(page: Int, done: Boolean, overdue: Boolean): [Task]
    task(id: ID!): Task
  }

  type Mutation {
    addTask(name: String!, description: String!, dueDate: String!): Task
    updateTask(id: ID!, name: String, description: String, dueDate: String, done: Boolean): Task
    deleteTask(id: ID!): String
    markTaskDone(id: ID!): String
    markTasknotDone(id: ID!): String
  }
`;
