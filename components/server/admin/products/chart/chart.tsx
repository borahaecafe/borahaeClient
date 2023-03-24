import React from 'react'
import { Bar } from 'react-chartjs-2'
import { getProductTotal } from '../../../../../util/products/product.query'
import { useQuery } from '@apollo/client'
import { CategoryScale, Chart as Chartjs, Legend, LinearScale, PointElement, Title, Tooltip, LineElement } from 'chart.js/auto'
Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
import { format } from 'date-fns'

export default function Chart({ id }: any) {

    const { loading, data } = useQuery(getProductTotal, {
        variables: {
            productId: id
        }
    })

    if (loading) return null
    return (
        <div>
            <Bar
                options={{
                    scales: {
                        x: {
                            display: true,
                            grid: {
                                display: false
                            },


                        },
                        y: {
                            display: false,
                            title: {
                                text: "Total",
                                display: true
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {

                                title: () => format(new Date(), "MMM dd, yyyy h:mm a")
                            }
                        },
                        legend: {
                            display: false
                        }
                    }
                }}

                data={{

                    datasets: [ {
                        data: data.getProductTotal.map(({ total }: any) => {
                            return total
                        }
                        ),
                        borderColor: "#A020F0",
                        backgroundColor: "#CF8FF7",
                    } ],
                    labels: data.getProductTotal.map(({ createdAt }: any) => {
                        return format(new Date(createdAt), "MMM dd, yyyy")
                    })
                }} />
        </div>
    )
}
