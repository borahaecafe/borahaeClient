import { gql } from "@apollo/client";


export const createUserRoles = gql`mutation Mutation(
  $profile: profileInput!
  $companyName: String!
  $role: String!
  $email: EmailAddress
) {
  createUserAccount(
    Profile: $profile
    companyName: $companyName
    role: $role
    email: $email
  ) {
    createdAt
    email
    password
    role
    userID
    profile {
      firstname
      lastname
    }
  }
}
`

export const updateUserProfiles = gql`mutation UpdateUserProfile($profile: profileInput, $userId: ID!) {
  updateUserProfile(profile: $profile, userID: $userId) {
    email
    profile {
      firstname
      lastname
    }
  }
}`


export const deleteMyAccount = gql`mutation DeleteUserAccount($userId: ID!) {
  deleteUserAccount(userID: $userId) {
    email
  }
}`

export const updateUserPass = gql`mutation UpdateUserPassword($userId: ID!) {
  updateUserPassword(userID: $userId) {
    createdAt
  }
}`

export const lockedUserAcc = gql`mutation UserlockedAccount($userId: ID!, $locked: Boolean!) {
  userlockedAccount(userID: $userId, locked: $locked) {
    locked
  }
}`