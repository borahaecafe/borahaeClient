import { gql } from "@apollo/client";



export const profileQuery = gql`query Query($userId: ID!) {
  getProfileById(userID: $userId) {
    firstname
    lastname
    profileID
  }
}`