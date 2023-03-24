import { gql } from "@apollo/client";

export const gp = gql`query Query($limit: Int!, $offset: Int!) {
  getAllProduct(limit: $limit, offset: $offset) {
    price
    productID
    sku
    stock
    title
  }
}`


export const gpId = gql`query GetProductID($productId: ID!) {
  getProductID(productID: $productId) {
    price
    productID
    sku
    stock
    title
    createdAt
    orders {
      total
    createdAt
    }
  }
}`


export const gpUser = gql`query Query($userId: ID!) {
  getProductsByUser(userID: $userId) {
    price
    productID
    sku
    stock
    title
  }
}`


export const getCProduct = gql`query GetCompanyProducts($userId: ID!) {
  getCompanyProducts(userID: $userId) {
    price
    productID
    title 
    stock
    createdAt
    company {
      companyID
      companyName
      product {
        title
      }
    }
  }
}`

export const queryAll = gql`query GetAllProducts {
  getAllProducts {
    title
  }
}`


export const getProductTotal = gql`query GetProductTotal($productId: ID!) {
  getProductTotal(productID: $productId) {
    orderID
    total
    createdAt
  }
}`



export const getProductGroup = gql`query Query($userId: ID!) {
  getProductByGroup(userID: $userId) {
    count
    title
  }
}`