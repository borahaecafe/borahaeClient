import React from 'react'
import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart as Chartjs, Legend, BarElement, LinearScale, PointElement, Title, Tooltip, LineElement } from 'chart.js/auto'
Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
import { useQuery } from '@apollo/client'
import { getAllOrders, totalOrderByGroup } from '../../../../util/order/order.query'
import styles from '../../../../styles/components/server/admin/overview/mainchart.module.scss'
import { format } from 'date-fns'

export default function MainChart({ startDate, endDate }: any) {

    const { loading, data } = useQuery(getAllOrders, {
        variables: {
            start: startDate,
            end: endDate
        }
    })

    if (loading) return null
    return (
        <div className={styles.mainchart}>
            <Bar
                options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            text: "Order History",
                            display: true,
                            align: "center",
                            font: {
                                size: 20,
                                weight: "500"
                            }
                        },
                    },
                    layout: {
                        autoPadding: true,
                    },
                    aspectRatio: 10,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            display: false,
                            title: {
                                text: "Item",
                                align: "center",
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                text: "Price",
                                align: "center",
                                display: true,
                                font: {
                                    size: 20,
                                    weight: "500"
                                }
                            }
                        }
                    },

                }}
                data={{
                    datasets: [
                        {
                            data: data.getAllOrders.map(({ total }: any) => {
                                return total
                            }),
                            label: "Total",
                            borderColor: "#A020F0",
                            backgroundColor: "#CF8FF7",
                        },
                    ],
                    labels: data.getAllOrders.map(({ orderedProduct }: any) => {
                        return orderedProduct[ 0 ]?.title
                    })
                }} />
        </div>
    )
}
