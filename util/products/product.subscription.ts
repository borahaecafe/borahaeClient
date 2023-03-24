import { gql } from "@apollo/client";



export const prodsub = gql`subscription Subscription {
    createProductSub {
      title
      stock
      sku
      productID
      price
      description
      category
    }
  }`