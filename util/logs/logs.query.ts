import { gql } from "@apollo/client";


export const UserLogs = gql`query Query($userId: ID!, $first: Int!, $offset: Int!) {
    getUserLog(userID: $userId, first: $first, offset: $offset) {
      log
      logsID
      createdAt
    }
  }`