import { gql } from "@apollo/client";


export const activeUser = gql`query GetAllActiveUser {
  getAllActiveUser {
    userID
    createdAt
  }
}`

export const groupCreatedUser = gql`query GetAllActiveUser {
  getAllUserByGroup {
    count
    createdAt
  }
}`

export const getAllUserQuery = gql`query GetAllUser($limit: Int!, $offset: Int!) {
  getAllUsers(limit: $limit, offset: $offset) {
    userID
    email
    role
    createdAt
    locked
    profile {
      firstname
      lastname
    }
    company {
      companyID
      companyName
    }
  }
}`

export const getUserBySearch = gql`query SearchUserByName($search: String!, $limit: Int!, $offset: Int!) {
  searchUserByName(search: $search, limit: $limit, offset: $offset) {
    createdAt
    locked
    profile {
      firstname
      lastname
    }
    company {
      companyID
      companyName
    }
    role
    userID
  }
}`


export const getUserProfile = gql`query Query($userId: ID!) {
  getUserID(userID: $userId) {
    userID
    email
    locked
    profile {
      birthday
      firstname
      lastname
      phone
    },
    company {
      companyID
      companyName
      companyAddress {
        addressID
        city
        province
        street
        zipcode
      }
    }
  }
}`


export const getAllUserAdmin = gql`query Query {
  getAllAdmin {
    company {
      companyID
      companyName
    }
  }
}`