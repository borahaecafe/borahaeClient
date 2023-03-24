import { gql } from "@apollo/client";



export const getMyCompanyDetails = gql`query GetCompanyDetails($userId: ID!) {
    getCompanyDetails(userID: $userId) {
      companyID
      companyName
      companyAddress {
        addressID
        city
        province
        street
        zipcode
      }
    }
  }`