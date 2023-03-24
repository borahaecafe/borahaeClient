import React from 'react'
import { getUserTotalOrder } from '../../../../../util/order/order.query'
import { useQuery } from '@apollo/client'

export default function Orders({ userid }: any) {
    const { loading, data } = useQuery(getUserTotalOrder, {
        variables: {
            userId: userid
        }
    })

    if (loading) return null

    return (
        <div>
            <h2>Total Purchase</h2>
            <span>{Intl.NumberFormat("en-PH", {
                notation: "standard"
                
            }).format(data.getAllTotalOrder.length)}</span>
        </div>
    )
}
