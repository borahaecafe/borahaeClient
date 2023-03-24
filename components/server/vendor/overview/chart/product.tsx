import React from 'react'
import { getCProduct } from '../../../../../util/products/product.query'
import { useQuery } from '@apollo/client'
export default function Product({ userid }: any) {



    const { loading, data } = useQuery(getCProduct, {
        variables: {
            userId: userid
        }
    })
    return (
        <div>
            <h2>Product</h2>
            <span>{Intl.NumberFormat("en-PH", {
                notation: "standard"
            }).format(loading ? null : data.getCompanyProducts.length)}</span>
        </div>
    )
}
