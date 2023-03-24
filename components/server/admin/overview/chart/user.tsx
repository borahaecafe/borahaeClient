import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { CategoryScale, Chart as Chartjs, Legend, BarElement, LinearScale, PointElement, Title, Tooltip, LineElement } from 'chart.js/auto'
import styles from '../../../../../styles/components/server/admin/chart/user.module.scss'
Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
import { activeUser, groupCreatedUser } from '../../../../../util/user/user.query'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'

export default function UserChart() {

    const { loading, data } = useQuery(activeUser)
    const { loading: groupLoading, data: groupData } = useQuery(groupCreatedUser)

    if (loading || groupLoading) return null
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <h1>{data.getAllActiveUser.length}</h1>
                <span>Total No. User</span>
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
                                display: false,
                            },
                        },
                        layout: {
                            padding: 10
                        },
                        scales: {
                            x: {
                                display: false
                            },
                            y: {
                                display: false
                            }
                        }
                    }}
                    data={{
                        datasets: [
                            {
                                data: groupData.getAllUserByGroup.map(({ createdAt, count }: any) => {
                                    return count
                                }),
                                borderColor: "#A020F0",
                                backgroundColor: "#CF8FF7",
                            }
                        ],
                        labels: groupData.getAllUserByGroup.map(({ createdAt, count }: any) => {
                            return createdAt
                        })
                    }} />
            </div>
        </div>
    )
}
