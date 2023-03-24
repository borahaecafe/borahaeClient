import { gql } from "@apollo/client";


export const createProducts = gql`
mutation Mutation($proudct: productInput!, $userId: ID!) {
  createProduct(proudct: $proudct, userID: $userId) {
    price
    sku
    stock
    title
    productID
  }
}
`


export const deleteProducts = gql`mutation Mutation($productId: ID!, $userId: ID!) {
  deleteProduct(productID: $productId, userID: $userId) {
    sku
    status
    title
    stock
    price
    productID
  }
}`


export const updateProducts = gql`mutation UpdateProduct($price: Int!, $productId: ID!, $userId: ID!, $title: String, $stock: Int) {
  updateProduct(price: $price, productID: $productId, userID: $userId, title: $title, stock: $stock) {
    productID
  }
} `