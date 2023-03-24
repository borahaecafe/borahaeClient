import { gql } from "@apollo/client";



export const AuthLogin = gql`mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}`


export const resetpass = gql`
mutation Mutation($retype: String!, $password: String!, $userId: ID!) {
  updateMyPassword(retype: $retype, password: $password, userID: $userId) {
    userID
  }
}
`