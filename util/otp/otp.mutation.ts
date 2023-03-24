import { gql } from "@apollo/client";


export const verification = gql`mutation Mutation($otp: String!) {
    verifyOTP(otp: $otp) {
      createdAt
      expiredAt
      otp
    }
  }`


export const recerateOTP = gql`mutation CreateOTP($email: EmailAddress!) {
  createOTP(email: $email) {
    otp
    expiredAt
    createdAt
  }
}`