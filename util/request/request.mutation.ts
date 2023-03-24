import { gql } from '@apollo/client'


export const ProductRequest = gql`mutation CreateProductRequest($vendorId: ID!, $productId: [ID]!) {
  createProductRequest(vendorID: $vendorId, productID: $productId) {
    createdAt
    message
    requestID
  }
}
`

export const UpdateRequest = gql`mutation Mutation($userId: ID!, $requestId: ID!, $status: String!) {
  updateRequest(userID: $userId, requestID: $requestId, status: $status) {
    status
    requestID
    message
    createdAt
  }
}`


export const vendorRequestDeletion = gql`mutation Mutation($productId: ID!, $userId: ID!) {
  deleteProductRequest(productID: $productId, userID: $userId) {
    message
    createdAt
    requestID
    status
  }
}`

export const vendorPullOut = gql`
mutation PulloutRequest($userId: ID!, $productId: ID!, $quantity: Int!) {
  pulloutRequest(userID: $userId, productID: $productId, quantity: $quantity) {
    createdAt
    message
    requestID
    status
  }
}`


export const vendoRestock = gql`mutation Mutation($userId: ID!, $productId: ID!, $stock: Int!) {
  restockrequest(userID: $userId, productID: $productId, stock: $stock) {
    createdAt
    message
    requestID
  }
}`

export const vendorCreateProd = gql`mutation CreateRequest($userId: ID!, $product: productInput) {
  createRequest(userID: $userId, product: $product) {
    title
  }
}`

export const adminREsupply = gql`mutation RequestProduct($userId: ID!, $productId: ID!, $quantity: Int!) {
  requestProduct(userID: $userId, productID: $productId, quantity: $quantity) {
    createdAt
    message
    productRequest {
      title
    }
    requestID
    status
  }
}
`