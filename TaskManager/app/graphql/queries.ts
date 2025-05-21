import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($page: Int, $done: Boolean, $overdue: Boolean) {
    tasks(page: $page, done: $done, overdue: $overdue) {
      id
      name
      description
      dueDate
      done
    }
  }
`;
