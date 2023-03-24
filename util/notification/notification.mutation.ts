import { gql } from "@apollo/client";

export const updateMyNotificaiton = gql`mutation Mutation($notificationId: ID!) {
    updateNotificationID(notificationID: $notificationId) {
      notificationID
      title
      createdAt
    }
  }`