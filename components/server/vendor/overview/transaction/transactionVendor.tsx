import React, { useEffect } from 'react'
import styles from '../../../../../styles/components/server/vendor/overview/transactionVendor.module.scss'
import Link from 'next/link'
import { getLimitedTransaction } from '../../../../../util/transaction/transaction.query'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'

export default function TransactionVendor({ userid }: any) {


    const { loading, data, startPolling } = useQuery(getLimitedTransaction, {
        variables: {
            userId: userid,
            limit: 14, offset: 0
        }
    })
    useEffect(() => {
        setTimeout(() => {
            startPolling(30000)
        }, 2000)
    }, [ startPolling ])
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>My Transaction</h2>
                <Link href="/dashboard/v/transaction">View All</Link>
            </div>
            <div className={styles.body}>
                <div className={styles.table}>
                    <div className={styles.headRow}>
                        <div className={styles.head}>
                            <div>Product Name</div>
                            <div>Price</div>
                            <div>Quantity</div>
                            <div>Date Ordered</div>
                            <div>Total</div>
                        </div>
                    </div>
                    {loading ? null : data?.getLimitedTransaction.map(({ orderID, quantity, status, total, payment, orderedProduct, createdAt }: any) => (
                        orderedProduct.map(({ title, price }: any) => (
                            <div className={styles.bodyRow} key={orderID}>
                                <div>{title}</div>
                                <div>{Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(price)}</div>
                                <div>{quantity}</div>
                                <div>{format(new Date(createdAt), "MMM dd, yyyy h:m:s a")}</div>
                                <div>{Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(total)}</div>
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    )
}
