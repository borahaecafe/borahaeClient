import { gql } from "@apollo/client";


export const companyDets = gql`mutation CreateCompanyDetails($companyId: ID!, $address: addressInput) {
  createCompanyDetails(companyID: $companyId, address: $address) {
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


export const updateCompDets = gql`mutation Mutation($companyId: ID!, $address: addressInput) {
  updateCompanyAddress(companyID: $companyId, address: $address) {
    addressID
    city
    province
    street
    zipcode
  }
} `