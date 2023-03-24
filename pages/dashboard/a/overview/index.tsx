import React, { FC, useState } from 'react'
import { useQuery } from '@apollo/client'
import { getCurrentHist } from '../../../../util/order/order.query'
import PageWithLayout from '../../../../layout/pagewithlayout'
import Dashboard from '../../../../layout/dashboard.layout'
import Head from 'next/head'
import styles from '../../../../styles/components/server/admin/overview/overview.module.scss'
import RevenueChart from '../../../../components/server/admin/overview/chart/revenue'
import UserChart from '../../../../components/server/admin/overview/chart/user'
import ProductChart from '../../../../components/server/admin/overview/chart/product'
import History from '../../../../components/server/admin/overview/order/history'
import jwtDecode from 'jwt-decode'
import MainChart from '../../../../components/server/admin/overview/mainc'
import { format, subDays } from 'date-fns'

interface Orders {
    orderID: string
    total: number
    orderedProduct: []
    quantity: number
}
const Overview: FC = ({ userid }: any) => {


    const [ startDate, setStartDate ] = useState(format(subDays(new Date(Date.now()), 5), "yyyy-MM-dd"))
    const [ endDate, setEndDate ] = useState(format(new Date(Date.now()), "yyyy-MM-dd"))

    const { loading: loadcurr, data: dataCurr } = useQuery(getCurrentHist, {
        variables: {
            start: format(new Date(Date.now()), "MM-dd-yyy"),
        },
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>Overview</title>
            </Head>
            <div className={styles.con}>
                <div className={styles.same}>
                    <div className={styles.oc}>
                        <div className={styles.box}>
                            <h2>Active User</h2>
                            <div className={styles.sub}>
                                <UserChart />
                            </div>
                        </div>
                        <div className={styles.box}>
                            <h2>Product</h2>
                            <div className={styles.sub}>
                                <ProductChart userid={userid} />
                            </div>
                        </div>
                        <div className={styles.box}>
                            <h2>Total Revenue</h2>
                            <div className={styles.sub}>
                                <RevenueChart userid={userid} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.chart}>
                        <div className={styles.header}>
                            <div className={styles.dateCon}>
                                <span>From:</span>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div className={styles.dateCon}>
                                <span>To:</span>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>
                        <div className={styles.body}>
                            <MainChart startDate={startDate} endDate={endDate} />
                        </div>
                    </div>
                </div>
                <div className={styles.ch}>
                    <h2 className={styles.title}>Order History</h2>
                    <div className={styles.containerCh}>
                        {loadcurr ? null : dataCurr.getCurrentOrderHistory.map(({ orderID, orderedProduct, quantity, total }: Orders) => (
                            orderedProduct.map(({ title }) => (
                                <History key={orderID}
                                    id={orderID} title={title}
                                    total={total} quantity={quantity} />
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}



(Overview as PageWithLayout).layout = Dashboard
export default Overview



export const getServerSideProps = (context: any) => {
    const cookies = context.req.cookies[ "company_access_token" ]
    const { userId }: any = jwtDecode(cookies)
    return {
        props: {
            userid: userId
        }
    }
}