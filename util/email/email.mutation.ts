import { gql } from "@apollo/client";


export const createEmail = gql`mutation CreateMeAnEmail($email: EmailAddress!, $phone: String!, $firstname: String!, $lastname: String!, $additionInfo: String!) {
    createMeAnEmail(email: $email, phone: $phone, firstname: $firstname, lastname: $lastname, additionInfo: $additionInfo) {
      additionInfo
      email
      firstname
      lastname
      phone
    }
  }`