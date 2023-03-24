import { gql } from "@apollo/client";



export const CreateOrder = gql`mutation Mutation($orderses: [orderInput]) {
    createOrder(orderses: $orderses) {
      orderID
      createdAt
      orderedProduct {
        title
        sku
      }
    }
  }`

export const UpdateOrder = gql`mutation Mutation($orderId: ID!, $status: String!) {
  updateOrderStatus(orderID: $orderId, status: $status) {
    orderID
    createdAt
    payment
  }
}`