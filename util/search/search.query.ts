import { gql } from '@apollo/client'

export const searchGql = gql`query GetSearchProduct($sku: String!,  $userId: ID!) {
    getSearchProduct(sku: $sku, userID: $userId) {
      stock
      sku
      price
      title
      productID
    }
  }`


export const searchCompany = gql`query GetSearchCompany($search: String!) {
  getSearchCompany(search: $search) {
    companyID
    companyName
    user {
      userID
      profile {
        firstname
        lastname
      }
    }
    orders {
      total
    }
    product {
      title
    }
  }
}`

export const findSKUProduce = gql`
query GetSearchSKU($sku: String!, $userId: ID!) {
  getSearchSKU(sku: $sku, userID: $userId) {
    createdAt
    title
    stock
    sku
    price
    productID
  }
}`