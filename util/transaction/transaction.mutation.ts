import { gql } from "@apollo/client";

export const getTotalRev = gql`mutation Mutation($userId: ID!, $start: String!, $end: String!) {
    getTotalSales(userID: $userId, start: $start, end: $end) {
      orderID
      createdAt
      total
      payment 
      quantity
      discount
      orderedProduct {
        title
      }
    }
  }`

export const getAllCompanySales = gql`mutation Mutation($userId: ID!, $start: ID!, $end: String!) {
    getAllSales(userID: $userId, start: $start, end: $end) {
      orderID
      createdAt
      total
      quantity
      payment
      status
      discount
      orderedProduct {
        title
      }
    }
  }
`
export const getAllCompanyRefund = gql`mutation GetRefunded($userId: ID!, $start: String!, $end: String!) {
  getRefunded(userID: $userId, start: $start, end: $end) {
    total
  }
}`