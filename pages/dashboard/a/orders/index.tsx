import React, { FC, useEffect, useState } from 'react'
import PageWithLayout from '../../../../layout/pagewithlayout'
import Dashboard from '../../../../layout/dashboard.layout'
import styles from '../../../../styles/components/server/admin/orders/order.module.scss'
import Head from 'next/head'
import OrderList from '../../../../components/server/admin/order/orderList'
import jwtDecode from 'jwt-decode'
import DatePicker from 'react-datepicker'
import { useQuery } from '@apollo/client'
import { getAllOrders } from '../../../../util/order/order.query'
import { orderSub } from '../../../../util/order/order.subscription'
import { subDays } from 'date-fns'
import { format } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from 'react-csv'

import Download from '../../../../public/server/icon/download.svg'
const headers = [
    { label: "Item", key: "item" },
    { label: "sku", key: "sku" },
    { label: "Payment", key: "payment" },
    { label: "Date Ordered", key: "dateOrdered" },
    { label: "Status", key: "status" },
    { label: "Quantity", key: "quantity" },
    { label: "Total", key: "total" }
]


const Orders: FC = ({ userid }: any) => {


    const [ startDate, setStartDate ] = useState(new Date(subDays(Date.now(), 7)))
    const [ endDate, setEndDate ] = useState(new Date(Date.now()))
    const [ filename, setFilename ] = useState(`${new Date(Date.now())}-orders`)
    const { loading, data, subscribeToMore } = useQuery(getAllOrders, {
        variables: {
            start: startDate,
            end: endDate
        }
    })

    useEffect(() => {
        return subscribeToMore({
            document: orderSub,
            variables: {
                userId: userid
            },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) prev
                const newOrders = subscriptionData.data.userOrderSubscription
                return Object.assign({}, {
                    getAllOrders: [ ...prev.getAllOrders, newOrders ]
                })
            }
        })
    }, [ subscribeToMore, userid ])


    const datas = data ? data.getAllOrders.map(({ createdAt, payment, orderedProduct, total, quantity, status }: any) => {
        return {
            item: orderedProduct[ 0 ].title,
            sku: orderedProduct[ 0 ].sku,
            payment: payment === "gcash" ? "GCASH" : null || payment === "cash" ? "CASH" : null || payment === "bpi/bdo" ? "BPI/BDO" : null,
            dateOrdered: format(new Date(createdAt), "MM dd, yyyy h:m:s a"),
            status: status === "approved" ? "Sold" : null || status === "refund" ? "Refund" : null,
            quantity: quantity,
            total: total
        }
    }) : null

    return (
        <div className={styles.container}>
            <Head>
                <title>Orders</title>
            </Head>

            <div className={styles.orderContainer}>
                <div className={styles.header}>
                    <div className={styles.filterDate}>
                        <div className={styles.date}>
                            <span>Start Date: </span>
                            <DatePicker
                                selected={startDate}
                                onChange={(date: Date) => setStartDate(date)} startDate={startDate} endDate={endDate} />
                        </div>
                        <div className={styles.date}>
                            <span>End Date: </span>
                            <DatePicker
                                selected={endDate}
                                onChange={(date: Date) => setEndDate(date)} startDate={startDate} endDate={endDate} />
                        </div>
                    </div>
                    <div>
                        {data ? <CSVLink data={datas} headers={headers} filename={filename} className={styles.csvFile}>
                            <Download />
                        </CSVLink> : null}
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.table}>
                        <div className={styles.headerRow}>
                            <div className={styles.head}>
                                <div>Product Name</div>
                                <div>Quantity</div>
                                <div>SKU</div>
                                <div>Total</div>
                                <div>Payment</div>
                                <div>Date</div>
                                <div>Status</div>
                            </div>
                        </div>
                        {loading ? null : data.getAllOrders.map(({ orderID, createdAt, payment, orderedProduct, total, quantity, status }: any) => (
                            orderedProduct.map(({ title, sku }: any) => (
                                <OrderList key={orderID} id={orderID} date={createdAt} status={status} sku={sku} title={title} payment={payment} total={total} quantity={quantity} />
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

(Orders as PageWithLayout).layout = Dashboard
export default Orders

export const getServerSideProps = async (context: any) => {
    const cookies = context.req.cookies[ "company_access_token" ]

    const { userId }: any = jwtDecode(cookies)

    return {
        props: {
            userid: userId
        }
    }

}