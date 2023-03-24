import { gql } from "@apollo/client";

export const notificationQ = gql`query NotificationQuery {
  notificationQuery {
    notificationID
    createdAt
    title
    user {
      profile {
        firstname
        lastname
        phone
        profileID
      }
    }
  }
}
  `


export const getNotiID = gql`query GetNotificationID($notificationId: ID!) {
  getNotificationID(notificationID: $notificationId) {
    createdAt
    notificationID
    request {
      requestID
      message
      status
      user {
        profile {
          firstname
          lastname
        }
      }
      productRequest {
        title
      }
    }
    title
  }
}`

export const getNotificationByUser = gql`query Query($userId: ID!) {
  getUserNotification(userID: $userId) {
    notification {
      notificationID
      createdAt
      notificationStatus
      title
      request {
        requestID
        message
        createdAt
        user {
          profile {
            firstname
            lastname
          }
        }
      }
    }
    userID
  }
}`


export const getUnreadNotif = gql`query GetUnreadNotification($userId: ID!) {
  getUnreadNotification(userID: $userId) {
    createdAt
    notificationID
    notificationStatus
  }
}`