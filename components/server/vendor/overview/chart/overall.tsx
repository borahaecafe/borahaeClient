import React from 'react'
import { useQuery } from '@apollo/client'
import { getAllRevenue } from '../../../../../util/order/order.query'

export default function Overall({ userid }: any) {
    const { loading, data } = useQuery(getAllRevenue, {
        variables: {
            userId: userid
        }
    })
    return (
        <div>
            <h2>Total Revenue</h2>
            <span>
                {Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP"
                }).format(data?.getTotalRevenue.reduce((a: any, b: any) => (a + b.total), 0))}
            </span>
        </div>
    )
}
