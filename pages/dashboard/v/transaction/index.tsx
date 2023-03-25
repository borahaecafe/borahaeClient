import React, { FC, useEffect, useState } from 'react'
import PageWithLayout from '../../../../layout/pagewithlayout'
import Vendor from '../../../../layout/vendor.layout'
import Head from 'next/head'
import styles from '../../../../styles/components/server/vendor/transaction/transaction.module.scss'
import { useLazyQuery } from '@apollo/client'
import { getTrasactionByCompany, getAllVendorTransaction } from '../../../../util/transaction/transaction.query'
import jwtDecode from 'jwt-decode'
import { format, subDays } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";


const Transaction: FC = ({ userid }: any) => {

    const [ startDate, setStartDate ] = useState(format(subDays(new Date(Date.now()), 10), "yyyy-MM-dd"))
    const [ endDate, setEndDate ] = useState(format(new Date(Date.now()), "yyyy-MM-dd"))
    const [ getMyTransaction, { data } ] = useLazyQuery(getTrasactionByCompany)

    const [ getMyTotal, { data: dataTotal } ] = useLazyQuery(getAllVendorTransaction)
    useEffect(() => {
        getMyTransaction({
            variables: {
                userId: userid,
                start: startDate,
                end: endDate
            },
        })
    }, [ endDate, getMyTransaction, startDate, userid ])


    useEffect(() => {
        getMyTotal({
            variables: {
                userId: userid,
                start: startDate,
                end: endDate
            }
        })
    }, [ endDate, getMyTotal, startDate, userid ])

    return (
        <div className={styles.container}>
            <Head>
                <title>Transaction</title>
            </Head>
            <div className={styles.transactionContainer}>
                <div className={styles.header}>
                    <h2>My Transaction</h2>
                    <div className={styles.calendars}>
                        <div className={styles.calIn}>
                            <span>From: </span>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className={styles.calIn}>
                            <span>To: </span>
                            <input type="date" value={endDate} onChange={(e) => {
                                setEndDate(e.target.value)
                            }} />
                        </div>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.table}>
                        <div className={styles.headRow}>
                            <div className={styles.head}>
                                <div>Product Name</div>
                                <div>Price</div>
                                <div>Quantity</div>
                                <div>Date Ordered</div>
                                <div>Payment</div>
                                <div>Status</div>
                                <div>Total</div>
                            </div>
                        </div>
                        {data?.getAllTransactionByCompany.map(({ orderedProduct, orderID, payment, quantity, total, createdAt, status }: any) => (
                            orderedProduct.map(({ title, price }: any) => (
                                <div className={styles.bodyRow} key={orderID}>
                                    <div>{title}</div>
                                    <div>{Intl.NumberFormat("en-PH", {
                                        style: "currency",
                                        currency: "PHP"
                                    }).format(price)}</div>
                                    <div>x{quantity}</div>

                                    <div>{format(new Date(createdAt), "MMMM dd yyyy hh:mm:ss")}</div>

                                    <div>
                                        {
                                            payment === "gcash" ? "GCASH" : null

                                        }
                                        {
                                            payment === "bpi/bdo" ? "BDO/BPI" : null

                                        }
                                        {
                                            payment === "cash" ? "CASH" : null

                                        }

                                    </div>
                                    <div>
                                        {status === "approved" ? "Approved" : null}
                                        {status === "refund" ? "Refund" : null}
                                    </div>
                                    <div>{Intl.NumberFormat("en-PH", {
                                        style: "currency",
                                        currency: "PHP"
                                    }).format(total)}</div>
                                </div>
                            ))
                        ))}

                    </div>
                </div>
                <div className={styles.total}>
                    <h2>Grand Total</h2>
                    <span> {Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP"
                    }).format(dataTotal?.getTotalVendorTransaction.reduce((a: any, b: any) => (a + b.total), 0))}</span>
                </div>
            </div>
        </div>
    )
}


(Transaction as PageWithLayout).layout = Vendor
export default Transaction


export const getServerSideProps = async (context: any) => {
    const cookies = context.req.cookies[ "company_access_token" ]
    const { userId }: any = jwtDecode(cookies)
    return {
        props: {
            userid: userId
        }
    }
}