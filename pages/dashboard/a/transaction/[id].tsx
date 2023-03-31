import React, { useState, useEffect } from 'react'
import PageWithLayout from '../../../../layout/pagewithlayout'
import Dashboard from '../../../../layout/dashboard.layout'
import styles from '../../../../styles/components/server/admin/transaction/company.module.scss'
import Head from 'next/head'
import { client } from '../../../_app'
import { getCompanyById, transactionQuery, getTrasactionByCompany } from '../../../../util/transaction/transaction.query'
import { useLazyQuery } from '@apollo/client'
import { format, subDays } from 'date-fns'
import { useRouter } from 'next/router'
export const getStaticPaths = async () => {

    const { data: { getAllCompanyUser } } = await client.query({
        query: transactionQuery
    })


    const paths = getAllCompanyUser.map(({ companyID }: any) => {
        return { params: { id: companyID } }
    })
    return {
        paths, fallback: true,
    }
}
export const getStaticProps = async (context: any) => {

    const companyid = context.params.id

    const { data: { getCompanyID } } = await client.query({
        query: getCompanyById, variables: {
            companyId: companyid
        },
        fetchPolicy: "no-cache"
    })
    return {
        props: {
            company: getCompanyID
        },
        revalidate: 60
    }
}
const TransactionID = ({ company }: any) => {

    const router = useRouter()

    const [ id, setID ] = useState("")

    const [ startDate, setStartDate ] = useState(format(subDays(new Date(Date.now()), 7), "yyyy-MM-dd"))
    const [ endDate, setEndDate ] = useState(format(new Date(Date.now()), 'yyyy-MM-dd'))

    useEffect(() => {
        company.map(({ user }: any) => {
            user.map(({ userID }: any) => {
                setID(userID)
            })
        })
    }, [ company ])

    const [ getMyDate, { data } ] = useLazyQuery(getTrasactionByCompany)

    useEffect(() => {
        getMyDate({
            variables: {
                userId: id,
                start: startDate,
                end: endDate
            },
        })
    }, [ endDate, getMyDate, id, startDate ])

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        company.map(({ companyID, companyName, user, orders }: any) => (
            user.map(({ profile }: any) => (
                profile.map(({ firstname, lastname }: any) => (
                    <div className={styles.container} key={companyID}>
                        <Head>
                            <title>{`${companyName} - ${firstname} ${lastname}`}</title>
                        </Head>
                        <div className={styles.companyContainer}>
                            <div className={styles.detail}>
                                <h2>{companyName}</h2>
                                <span>{firstname} {lastname}</span>
                            </div>
                            <div className={styles.total}>
                                <h2>
                                    {Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(orders.reduce((a: any, b: any) => (a + b.total), 0))}
                                </h2>
                            </div>
                        </div>
                        <div className={styles.transactionList}>
                            <div className={styles.header}>
                                <div>
                                    <h2>Transaction</h2>
                                </div>
                                <div>
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
                                    {data?.getAllTransactionByCompany.map(({ orderedProduct, orderID, payment, quantity, total, status, createdAt }: any) => (
                                        orderedProduct.map(({ title, price }: any) => (
                                            <div className={styles.bodyRow} key={orderID}>
                                                <div>{title}</div>
                                                <div>{Intl.NumberFormat("en-PH", {
                                                    style: "currency",
                                                    currency: "PHP"
                                                }).format(price)}</div>
                                                <div>x{quantity}</div>

                                                <div>{format(new Date(createdAt), "MMMM dd yyyy")}</div>

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
                        </div>
                    </div>
                ))
            ))
        ))
    )
}

(TransactionID as PageWithLayout).layout = Dashboard
export default TransactionID
