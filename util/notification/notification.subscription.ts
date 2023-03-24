import { gql } from "@apollo/client";


export const notifiSubscription = gql`subscription Subscription($userId: ID!) {
  notificationSubscriptions(userID: $userId) {
    title
    createdAt
    notificationID
    notificationStatus
    request {
      message
      createdAt
      requestID
      productRequest {
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
  }
}`