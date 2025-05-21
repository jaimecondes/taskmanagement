import { gql } from '@apollo/client';

export const ADD_TASK = gql`
  mutation AddTask($name: String!, $description: String!, $dueDate: String!) {
    addTask(name: $name, description: $description, dueDate: $dueDate) {
      id
      name
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $name: String!, $description: String, $dueDate: String) {
    updateTask(id: $id, name: $name, description: $description, dueDate: $dueDate) {
      id
      name
      description
      dueDate
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export const MARK_TASK_DONE = gql`
  mutation MarkTaskDone($id: ID!) {
    markTaskDone(id: $id)
  }
`;
export const MARK_TASK_NOT_DONE = gql`
  mutation MarkTasknotDone($id: ID!) {
    markTasknotDone(id: $id)
  }
`;