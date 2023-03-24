import { gql } from "@apollo/client";


export const transactionQuery = gql`query GetAllCompanyUser {
  getAllCompanyUser {
    companyID
    companyName
    orders {
      total
    }
    product {
      title
    }
    user {
      userID
      profile {
        firstname
        lastname
      }
    }
  }
}`

export const getCompanyById = gql`query GetAllOrders($companyId: ID!) {
  getCompanyID(companyID: $companyId) {
    companyID
    companyName
    product {
      title
    }
    orders {
      total
    }
    user {
      userID
      email
      profile {
        firstname
        lastname
      }
    }
  }
}`

export const getTrasactionByCompany = gql`query GetAllTransactionByCompany($userId: ID!, $start: String, $end: String) {
  getAllTransactionByCompany(userID: $userId, start: $start, end: $end) {
    orderID
    quantity
    total
    payment
    createdAt
    status
    orderedProduct {
      title
      price
    }
  }
}`

export const getLimitedTransaction = gql`query GetLimitedTransaction($userId: ID!, $limit: Int!, $offset: Int!) {
  getLimitedTransaction(userID: $userId, limit: $limit, offset: $offset) {
    orderID
    quantity
    status
    total
    payment
    orderedProduct {
      title
      price
    }
    createdAt
  }
}`

