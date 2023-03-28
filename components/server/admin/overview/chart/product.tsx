import React from 'react'
import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart as Chartjs, Legend, LinearScale, PointElement, Title, Tooltip, LineElement } from 'chart.js/auto'
import styles from '../../../../../styles/components/server/admin/chart/product.module.scss'
Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
import { getCProduct, getProductGroup } from '../../../../../util/products/product.query'
import { useQuery } from '@apollo/client'

export default function ProductChart({ userid }: any) {

    const { loading, data } = useQuery(getCProduct, {
        variables: {
            userId: userid
        },
        query: getCProduct,
        pollInterval: 1000
    })

    const { loading: groupLoad, data: groupData } = useQuery(getProductGroup, {
        variables: {
            userId: userid
        }
    })

    if (loading || groupLoad) return null
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <h1>{data.getCompanyProducts.length}</h1>
                <span>No. Product</span>
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
                            padding: 10,
                        },
                        scales: {
                            x: {
                                display: false
                            },
                            y: {
                                display: false,

                            }
                        }
                    }}
                    data={{
                        datasets: [
                            {
                                data: groupData.getProductByGroup.map(({ count, createdAt }: any) => {
                                    return count
                                }),
                                borderColor: "#A020F0",
                                backgroundColor: "#CF8FF7",
                            },
                        ],
                        labels: groupData.getProductByGroup.map(({ count, title }: any) => {
                            return title
                        }),
                    }} />
            </div>
        </div>
    )
}
