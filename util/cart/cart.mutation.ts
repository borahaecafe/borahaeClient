import { gql } from "@apollo/client";



export const createCart = gql`mutation CreateCart($quantity: Int!, $productId: ID!, $userId: ID!) {
    createCart(quantity: $quantity, productID: $productId, userID: $userId) {
      quantity
      cartID
      product {
        productID
        title
        price
      }
    }
}`


export const deleteCart = gql`mutation Mutation($cartId: ID!) {
  deleteCart(cartID: $cartId) {
    cartID
    quantity
  }
}`

