import { gql } from "@apollo/client";

export const orderSub = gql`subscription Subscription($userId: ID!) {
    userOrderSubscription(userID: $userId) {
      orderID
      orderedProduct {
        productID
        title
        sku
      }
      total
      status
      quantity
      createdAt
      payment
    }
  }
  `