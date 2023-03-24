import React from 'react'
import { getTotalPerMotnh } from '../../../../../util/order/order.query'
import { useQuery } from '@apollo/client'
export default function Revenue({ userid }: any) {

    const { loading, data } = useQuery(getTotalPerMotnh, {
        variables: {
            userId: userid
        }
    })


    if (loading) return null
    return (
        <div>
            <h2>This Month</h2>

            {data.getAllTotalByMonth.length === 0 ? <span>
                {Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(0)}
            </span> : data.getAllTotalByMonth.map(({ total, date }: any) => (
                <span key={date}>
                    {Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(total)}
                </span>
            ))}
        </div>
    )
}
