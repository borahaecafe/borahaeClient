import { gql } from "@apollo/client";


export const logCreate = gql`mutation Mutation($userId: ID!) {
    createLoginLog(userID: $userId) {
      createdAt
      log
      logsID
    }
  }`