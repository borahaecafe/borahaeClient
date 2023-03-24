import React from 'react'
import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart as Chartjs, Legend, LinearScale, PointElement, Title, Tooltip, LineElement } from 'chart.js/auto'
import styles from '../../../../../styles/components/server/admin/chart/revenue.module.scss'
Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
import { useQuery } from '@apollo/client'
import { getAllRevenue, totalOrderByGroup } from '../../../../../util/order/order.query'
import { add, format, subDays } from 'date-fns'


export default function Charts({ userid }: any) {

    const { loading, data } = useQuery(getAllRevenue, {
        variables: {
            userId: userid
        }
    })


    const { loading: groupLoading, data: groupData } = useQuery(totalOrderByGroup, {
        variables: {
            userId: userid,
            start: format(new Date(subDays(Date.now(), 5)), "yyyy-MM-dd"),
            end: format(add(new Date(Date.now()), {
                days: 1
            }), "yyyy-MM-dd")
        },
    })


    if (loading || groupLoading) return null

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <h1>{Intl.NumberFormat("en-PH", {
                    currency: "PHP", style: "currency", notation: "compact", compactDisplay: "short"
                }).format(data.getTotalRevenue.reduce((a: any, b: any) => (a + b.total), 0))}</h1>
                <span>Total Amount</span>
            </div>
            <div>
                <Bar
                    style={{
                        height: "90px",
                        width: "100%"
                    }}
                    options={{
                        plugins: {
                            legend: {
                                display: false
                            },
                        },
                        layout: {
                            padding: 10
                        },
                        scales: {
                            x: {
                                display: false,
                            },
                            y: {
                                display: false
                            }
                        },

                    }}
                    data={{
                        datasets: [
                            {
                                data: groupData.groupOrdersByDate.map(({ total, createdAt }: any) => {
                                    return total
                                }),
                                borderColor: "#A020F0",
                                backgroundColor: "#CF8FF7",
                            }
                        ],
                        labels: groupData.groupOrdersByDate.map(({ createdAt, orderedProduct }: any) => {
                            return orderedProduct[ 0 ]?.title
                        }),
                    }} />
            </div>
        </div>
    )
}
