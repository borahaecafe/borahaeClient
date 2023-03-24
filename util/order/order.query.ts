import { gql } from "@apollo/client";


export const getAllOrders = gql`
query GetAllOrders($start: String!, $end: String!) {
  getAllOrders(start: $start, end: $end) {
    orderID
    orderedProduct {
      productID
      sku
      title
    }
    quantity
    status
    payment
    total
    createdAt
  }
}
`

export const totalOrderByGroup = gql`query GroupOrdersByDate($userId: ID!, $start: String!, $end: String!) {
  groupOrdersByDate(userID: $userId, start: $start, end: $end) {
    total
    orderID
    createdAt
    orderedProduct {
      title
    }
  }
}`

export const getTotalPerMotnh = gql`query GetAllTotalByMonth($userId: ID!) {
  getAllTotalByMonth(userID: $userId) {
    date
    total
  }
}`


export const getAllRevenue = gql`query GetTotalRevenue($userId: ID!) {
  getTotalRevenue(userID: $userId) {
    total
    orderID
  }
}`

export const getCurrentHist = gql`query GetCurrentOrderHistory($start: String!) {
  getCurrentOrderHistory(start: $start) {
    orderID
    createdAt
    orderedProduct {
      title
    }
    quantity
    total
  }
}`

export const getUserTotalOrder = gql`query GetAllTotalOrder($userId: ID!) {
  getAllTotalOrder(userID: $userId) {
    orderID
  }
}`